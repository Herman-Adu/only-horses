<h1 align="center">OnlyHorses for Horse Lovers 🐴</h1>

![Demo App](/public/demo-for-readme.png)

[Video Tutorial on Youtube](https://youtu.be/mduqkHlJujA)

Some Features:

-   ⚛️ Tech Stack: Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Stripe
-   🔐 Authentication with Kinde Auth
-   💸 Monthly and Annually Subscriptions with Stripe.
-   💰 One Time Payments with Stripe
-   💵 Building a Stripe Billing Portal
-   🛒 E-Commerce Store
-   ✉ Sending "Successful Payment" Emails to Users
-   ✍️ Creating Posts
-   💬 Commenting on Posts
-   ❤️ Liking Posts
-   🔒 Secret Admin Dashboard
-   📝 Data Aggregation with Prisma
-   🖼️ Edit Profile
-   📷 Image/Video Uploads using Cloudinary
-   💙 Awesome Landing Page
-   🌐 Deployment
-   👀 And Millions of Other Cool Features
-   ✅ This is a lot of work. Support me by subscribing to the [Youtube Channel](https://www.youtube.com/@asaprogrammer_)

### Setup .env file

```js
// kinde
KINDE_CLIENT_ID=<get_from_kinde>
KINDE_CLIENT_SECRET=<get_from_kinde>
KINDE_ISSUER_URL=<get_from_kinde>
KINDE_SITE_URL=<get_from_kinde>
KINDE_POST_LOGOUT_REDIRECT_URL=<get_from_kinde>
KINDE_POST_LOGIN_REDIRECT_URL=<get_from_kinde>

// cloduinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<get_from_cloudinary>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<get_from_cloudinary>
CLOUDINARY_API_SECRET=<get_from_cloudinary>

DATABASE_URL=<any_postgres_db_url>

ADMIN_EMAIL=<your_email>

// stripe
STRIPE_SECRET_KEY=<get_from_stripe>
STRIPE_WEBHOOK_SECRET_DEV_KEY=<get_from_stripe>
STRIPE_WEBHOOK_SECRET_LIVE_KEY=<get_from_stripe>
NEXT_PUBLIC_STRIPE_DEV_MONTHLY_URL=<get_from_stripe>
NEXT_PUBLIC_STRIPE_LIVE_MONTHLY_URL=<get_from_stripe>
NEXT_PUBLIC_STRIPE_DEV_YEARLY_URL=<get_from_stripe>
STRIPE_MONTHLY_PLAN_PRICE_ID=<get_from_stripe>
STRIPE_YEARLY_PLAN_PRICE_ID=<get_from_stripe>
STRIPE_BILLING_PORTAL_LINK_DEV=<get_from_stripe>

// resend
RESEND_API_KEY=<get_from_resend>

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Install dependencies

```shell
npm install
```

### Start the app

```shell
npm run dev
```

<hr/>
<hr/>
This project is built for "Only Educational" purposes. 😳
<hr/>
<hr/>


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
