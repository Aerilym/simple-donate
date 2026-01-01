'use server';

import { headers } from 'next/headers';
import { getPriceFromPriceId, getPriceIdFromPrice, isRecurring, type Price } from '@/lib/stripeIds';
import { stripe } from '../../lib/stripe';

export async function fetchClientSecret(priceId: Price) {
  const price = getPriceFromPriceId(priceId);
  const mode = isRecurring(priceId) ? 'subscription' : 'payment';

  const origin = (await headers()).get('origin');

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode,
    locale: 'auto',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: { enabled: true },
  });

  if (!session.client_secret) {
    throw new Error('session.client_secret is undefined');
  }

  return session.client_secret;
}

export async function fetchPrices() {
  const prices = await stripe.prices.list();

  const formattedPrices: Partial<Record<Price, (typeof prices)['data'][number]>> = {};
  for (const item of prices.data) {
    const priceId = getPriceIdFromPrice(item.id);
    if (priceId) {
      formattedPrices[priceId] = item;
    }
  }

  return formattedPrices;
}
