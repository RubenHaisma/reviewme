// @/lib/plans.ts
export const PLANS = {
    BASIC: {
      name: 'Basic Plan',
      price: 30,
      features: [
        'Up to 100 reviews per month',
        'Email notifications',
        'Basic analytics',
        'Standard support',
        'Google review integration',
        'Custom email templates',
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_ID,
    },
    PRO: {
      name: 'Pro Plan',
      price: 99,
      features: [
        'Unlimited reviews',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Multiple team members',
        'Webhook integrations',
        'Custom domains',
        'White-label options',
        'Priority email support',
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID,
    },
  };