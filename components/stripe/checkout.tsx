'use client';

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { Price } from '@/lib/stripeIds';
import { fetchClientSecret } from '../../app/actions/stripe';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from '../../lib/env';

const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout({ priceId }: { priceId: Price }) {
  return (
    <div id="stripe" className="overflow-hidden rounded-md md:w-100">
      <EmbeddedCheckoutProvider
        key={priceId}
        stripe={stripePromise}
        options={{ fetchClientSecret: () => fetchClientSecret(priceId) }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
