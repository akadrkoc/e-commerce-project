# Coffee Lab

A modern coffee ecommerce website built with Next.js, Tailwind CSS, Prisma, and Stripe.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Payments:** Stripe (test mode)
- **Deployment:** Vercel

## Features

- Product listing and detail pages
- Shopping cart (add, remove, update quantity)
- Checkout with shipping form
- Stripe test mode payments
- Responsive, minimal UI
- Loading states and skeleton screens

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/akadrkoc/e-commerce-project.git
cd e-commerce-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

You need:
- **Supabase** project connection string (Session pooler)
- **Stripe** test mode API keys

### 4. Set up the database

```bash
npx prisma migrate deploy
npx prisma generate
npx tsx prisma/seed.ts
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Deploy

### Database

Use the **Session pooler** connection string from Supabase (port 5432) for migrations, and **Transaction pooler** (port 6543) for the app runtime if needed.

## Project Structure

```
src/
  app/
    page.tsx              # Homepage
    products/
      page.tsx            # Product listing
      [id]/page.tsx       # Product detail
      loading.tsx         # Skeleton loader
    cart/page.tsx          # Shopping cart
    checkout/
      page.tsx            # Checkout + shipping form
      success/page.tsx    # Order confirmation
    api/checkout/route.ts # Stripe API route
  components/
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    AddToCartButton.tsx
  context/
    CartContext.tsx        # Cart state management
  lib/
    prisma.ts             # Prisma client
    stripe.ts             # Stripe client
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Seed data
```
