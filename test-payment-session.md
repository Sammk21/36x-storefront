# Razorpay Payment Session Debugging Guide

## Issue
Payment session `data` object is empty when it should contain `key_id`, `amount`, `currency`, etc.

## Backend Check

### 1. Check Backend Logs
When you select Razorpay as payment method and click "Continue to review", check your backend terminal for:

```
Razorpay order created: order_xxxxx
```

If you see this log, it means `initiatePayment()` is working correctly.

### 2. Check Payment Session in Database

Run this query in your database (PostgreSQL):

```sql
SELECT id, provider_id, data, status, amount
FROM payment_session
WHERE provider_id = 'pp_razorpay_razorpay'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected `data` column should contain:**
```json
{
  "id": "order_xxxxxxxxxx",
  "amount": 201180,
  "currency": "INR",
  "status": "created",
  "receipt": "order_1699999999",
  "created_at": 1699999999,
  "key_id": "rzp_test_xxxxxxxxxx"
}
```

**If data is empty `{}`**, the issue is in how Medusa is storing the payment session.

## Common Fixes

### Fix 1: Check Medusa Config

In `/Users/samkhan/work/freelance/36x-dashboard/medusa-config.ts`:

```typescript
modules: [
  {
    resolve: "@medusajs/medusa/payment",
    options: {
      providers: [
        {
          resolve: "./src/modules/razorpay",
          id: "razorpay", // ⭐ Must match
          options: {
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
          }
        }
      ]
    }
  }
]
```

### Fix 2: Rebuild Backend

```bash
cd /Users/samkhan/work/freelance/36x-dashboard
npm run build
npm run dev
```

### Fix 3: Clear Payment Sessions

Delete old payment sessions and try again:

```sql
DELETE FROM payment_session WHERE provider_id = 'pp_razorpay_razorpay';
```

### Fix 4: Check Environment Variables

In backend `.env`:

```bash
cd /Users/samkhan/work/freelance/36x-dashboard
cat .env | grep RAZORPAY
```

Should show:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxx
```

### Fix 5: Add Debug Logging

Add this to `src/modules/razorpay/service.ts` after line 147:

```typescript
this.logger_.info(`Razorpay payment session data:`, JSON.stringify({
  data: {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    status: order.status,
    receipt: order.receipt,
    created_at: order.created_at,
    key_id: this.options_.key_id,
  },
}))
```

Then rebuild and check logs.

## Testing Steps

1. Start backend with verbose logging:
   ```bash
   cd /Users/samkhan/work/freelance/36x-dashboard
   npm run dev
   ```

2. In storefront:
   - Add item to cart
   - Go to checkout
   - Fill addresses
   - Select Razorpay
   - Click "Continue to review"

3. Check backend terminal for:
   ```
   Razorpay order created: order_xxxxx
   Razorpay payment session data: {...}
   ```

4. If you see the logs but still get empty data in frontend, the issue is with Medusa's payment session retrieval.

## Alternative: Check API Response Directly

In browser console, when on review page, run:

```javascript
// Get cart
const cartId = document.cookie.match(/cart_id=([^;]+)/)?.[1]
console.log('Cart ID:', cartId)

// Fetch cart with payment collection
fetch(`http://localhost:9000/store/carts/${cartId}?fields=*payment_collection,*payment_collection.payment_sessions`)
  .then(r => r.json())
  .then(data => {
    console.log('Payment sessions:', data.cart.payment_collection.payment_sessions)
  })
```

This will show you exactly what the API is returning.

## Expected vs Actual

**Expected:**
```json
{
  "id": "payses_xxx",
  "provider_id": "pp_razorpay_razorpay",
  "data": {
    "id": "order_xxx",
    "key_id": "rzp_test_xxx",
    "amount": 201180,
    "currency": "INR"
  }
}
```

**Actual (your case):**
```json
{
  "id": "payses_01K9M5NHHZPQ16VDQPA175ZW6Y",
  "provider_id": "pp_razorpay_razorpay",
  "data": {}  // ❌ EMPTY
}
```

## Next Steps

1. Check backend logs when creating payment session
2. Check database `payment_session` table
3. If both show correct data, issue is in API response
4. If backend shows correct data but DB is empty, issue is in Medusa's payment module persistence

Let me know what you find!
