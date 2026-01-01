import { redirect } from 'next/navigation';

import { stripe } from '../../lib/stripe';

export default async function Return({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id || typeof session_id !== 'string')
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const { status, customer_details } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>A confirmation email will be sent to {customer_details?.email ?? 'your email'}.</p>
      </section>
    );
  }
}
