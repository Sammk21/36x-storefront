# Backend Fix for Empty Payment Session Data

## Problem
The payment session `data` is empty (`{}`), which means either:
1. The `initiatePayment()` is throwing an error (returns `PaymentProviderError`)
2. The return value is not being persisted correctly

## Solution

### Step 1: Add Debug Logging

In `/Users/samkhan/work/freelance/36x-dashboard/src/modules/razorpay/service.ts`, update the `initiatePayment` method around line 118:

**Find this section:**
```typescript
async initiatePayment(
  input: CreatePaymentProviderSession
): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
  const {
    amount,
    currency_code,
    context,
  } = input

  try {
    // Convert amount from cents/paise to the smallest currency unit
    const amountInSmallestUnit = Math.round(amount)
```

**Replace with:**
```typescript
async initiatePayment(
  input: CreatePaymentProviderSession
): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
  const {
    amount,
    currency_code,
    context,
  } = input

  try {
    // Debug: Log input parameters
    this.logger_.info('=== Razorpay initiatePayment called ===')
    this.logger_.info(`Amount: ${amount}, Currency: ${currency_code}`)
    this.logger_.info(`Context keys: ${Object.keys(context).join(', ')}`)
    this.logger_.info(`Full context: ${JSON.stringify(context)}`)

    // Convert amount from cents/paise to the smallest currency unit
    const amountInSmallestUnit = Math.round(amount)
```

**Then find:**
```typescript
this.logger_.info(`Razorpay order created: ${order.id}`)

return {
  data: {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
    receipt: order.receipt,
    created_at: order.created_at,
    key_id: this.options_.key_id, // Pass key_id to frontend for Razorpay Checkout
  },
}
```

**Replace with:**
```typescript
this.logger_.info(`Razorpay order created: ${order.id}`)

const responseData = {
  data: {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
    receipt: order.receipt,
    created_at: order.created_at,
    key_id: this.options_.key_id, // Pass key_id to frontend for Razorpay Checkout
  },
}

this.logger_.info('=== Razorpay initiatePayment response ===')
this.logger_.info(JSON.stringify(responseData, null, 2))

return responseData
```

### Step 2: Fix Context Access (Potential Issue)

**Find this line:**
```typescript
receipt: context.order_id || `order_${Date.now()}`,
notes: {
  cart_id: context.cart?.id,
  customer_id: context.customer?.id,
  email: context.customer?.email,
},
```

**Replace with:**
```typescript
receipt: `cart_${(context as any).resource_id || Date.now()}`,
notes: {
  resource_id: (context as any).resource_id,
},
```

The issue is that `context.cart`, `context.customer`, etc. don't exist in Medusa v2. The context only has `resource_id`.

### Step 3: Rebuild and Test

```bash
cd /Users/samkhan/work/freelance/36x-dashboard
npm run build
npm run dev
```

Watch the terminal logs carefully when you select Razorpay payment method.

### Step 4: Check Logs

You should see:
```
=== Razorpay initiatePayment called ===
Amount: 2011.8, Currency: inr
Context keys: resource_id, ...
Full context: {...}
Razorpay order created: order_xxxxx
=== Razorpay initiatePayment response ===
{
  "data": {
    "id": "order_xxxxx",
    "amount": 201180,
    "currency": "INR",
    "status": "created",
    "receipt": "cart_xxxxx",
    "created_at": 1699999999,
    "key_id": "rzp_test_Rdc0e6qZsvAqwJ"
  }
}
```

If you see an error instead, that's the root cause!

### Step 5: Common Errors

#### Error: "amount must be at least INR 1.00"
**Fix:** Razorpay requires minimum 100 paise (₹1). Your amount is `2011.8` which should be fine, but if testing with lower amounts, ensure `amount >= 100`.

#### Error: "Bad request - API key/secret wrong"
**Fix:** Check `.env` file has correct `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

#### Error: Type error with context
**Fix:** The context structure changed in Medusa v2. Use `(context as any).resource_id` instead of `context.cart.id`.

## Alternative Quick Fix

If you want to test immediately without logging, try this minimal change:

**In `src/modules/razorpay/service.ts` around line 125:**

Change:
```typescript
receipt: context.order_id || `order_${Date.now()}`,
notes: {
  cart_id: context.cart?.id,
  customer_id: context.customer?.id,
  email: context.customer?.email,
},
```

To:
```typescript
receipt: `receipt_${Date.now()}`,
notes: {},
```

This removes all context dependencies that might be causing errors.

Then rebuild:
```bash
cd /Users/samkhan/work/freelance/36x-dashboard
npm run build && npm run dev
```

## What to Share

After making these changes, share:
1. Backend terminal logs (especially the debug logs)
2. Any errors that appear
3. Whether the payment session data is still empty

This will help us identify the exact issue!
