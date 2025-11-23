# 36X Streetwear Storefront

A modern, performant e-commerce storefront built with Next.js 15 and Medusa V2, customized for 36X streetwear brand.

## Overview

This storefront is built with:

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Medusa V2](https://medusajs.com/) - Commerce backend

## Features

### E-commerce Functionality
- Product Detail Pages
- Product Collections
- Shopping Cart
- Checkout with multiple payment providers (Stripe, Razorpay, PayPal)
- User Accounts & Authentication
- Order Management
- Multi-currency & Multi-region support

### Design & Branding
- Custom 36X branding and color scheme
- Bebas Neue font for display text
- Raleway font for body text
- Brick texture background pattern
- Responsive design for all devices

### Technical Features
- Next.js 15 App Router
- Server Components & Server Actions
- Optimized fetching and caching
- Static Pre-Rendering
- Streaming support
- TurbopackDev mode for faster builds

## Prerequisites

You need a Medusa backend server running locally on port 9000. For a quick setup:

```shell
npx create-medusa-app@latest
```

See [Medusa installation docs](https://docs.medusajs.com/learn/installation) for more details.

## Getting Started

### 1. Install Dependencies

```shell
yarn
```

### 2. Environment Variables

Create a `.env.local` file based on `.env.template`:

```shell
cp .env.template .env.local
```

Required environment variables:
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=us
```

### 3. Start Development Server

```shell
yarn dev
```

Your site will be running at [http://localhost:8000](http://localhost:8000)

## Payment Integrations

This storefront supports multiple payment providers:

- **Stripe** - Credit card payments
- **Razorpay** - Indian payment gateway
- **PayPal** - Global payment platform

### Stripe Setup

Add to your `.env.local`:
```shell
NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
```

Configure Stripe in your Medusa backend following the [Stripe integration docs](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe).

### Razorpay Setup

Add to your `.env.local`:
```shell
NEXT_PUBLIC_RAZORPAY_KEY=<your-razorpay-key>
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── modules/                # Feature modules
│   ├── account/           # User account management
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components (nav, footer)
│   ├── products/          # Product displays
│   └── store/             # Store/collection pages
├── lib/                   # Utilities and data fetching
├── styles/                # Global styles
└── types/                 # TypeScript types
```

## Customization

### Branding
- Colors: Edit `tailwind.config.js` under `theme.extend.colors.brand`
- Fonts: Configure in `src/app/layout.tsx`
- Logo: Replace navigation logo in `src/modules/layout/templates/nav/`

### Homepage
The homepage has been cleared for custom content. Add your sections in:
```
src/app/[countryCode]/(main)/page.tsx
```

## Build & Deploy

### Production Build
```shell
yarn build
```

### Start Production Server
```shell
yarn start
```

## Resources

### Medusa
- [Medusa Website](https://www.medusajs.com/)
- [Medusa Documentation](https://docs.medusajs.com/)
- [Medusa GitHub](https://github.com/medusajs)

### Next.js
- [Next.js Website](https://nextjs.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)

## License

This project is private and proprietary to 36X.
