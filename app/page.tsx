import type { ReactNode } from 'react';
import { CryptoAddressDisplay } from '@/components/CryptoAddressDisplay';
import { Footer } from '@/components/Footer';
import { StripeCheckout } from '@/components/stripe/Stripe';
import {
  NEXT_PUBLIC_ADDRESS_BTC,
  NEXT_PUBLIC_ADDRESS_ETH,
  NEXT_PUBLIC_ADDRESS_SOL,
  NEXT_PUBLIC_ENABLE_ONE_TIME_CARD_DONATION,
  NEXT_PUBLIC_ENABLE_SPONSORS,
  NEXT_PUBLIC_STRING_CARD_DESCRIPTION,
  NEXT_PUBLIC_STRING_CRYPTO_DESCRIPTION,
  NEXT_PUBLIC_STRING_GIT_PROVIDER_LINK,
  NEXT_PUBLIC_STRING_GIT_PROVIDER_NAME,
  NEXT_PUBLIC_STRING_WEBSITE_LINK,
  NEXT_PUBLIC_STRING_WEBSITE_NAME,
} from '@/lib/env';
import { formatNodeList } from '@/lib/reactFormat';
import { fetchPrices } from './actions/stripe';

export const dynamic = 'force-static';

const h2ClassName =
  'max-w-xs text-xl font-semibold leading-8 tracking-tight text-black dark:text-zinc-50';

const aClassName = 'font-semibold';

type WorkDescriptionItem = { name: string; link: string };
const workDescriptionContent: Array<WorkDescriptionItem> = [];

if (NEXT_PUBLIC_STRING_WEBSITE_LINK && NEXT_PUBLIC_STRING_WEBSITE_NAME) {
  workDescriptionContent.push({
    name: NEXT_PUBLIC_STRING_WEBSITE_NAME,
    link: NEXT_PUBLIC_STRING_WEBSITE_LINK,
  });
} else {
  console.warn('Website link or name not defined, this wont be added to the page.');
}

if (NEXT_PUBLIC_STRING_GIT_PROVIDER_LINK && NEXT_PUBLIC_STRING_GIT_PROVIDER_NAME) {
  workDescriptionContent.push({
    name: NEXT_PUBLIC_STRING_GIT_PROVIDER_NAME,
    link: NEXT_PUBLIC_STRING_GIT_PROVIDER_LINK,
  });
} else {
  console.warn('Git Provider link or name not defined, this wont be added to the page.');
}

const workDescription: Array<ReactNode> = [];
if (workDescriptionContent.length) {
  workDescription.push('You can find my work on');
  workDescription.push(
    ...formatNodeList({
      items: workDescriptionContent,
      componentConstructor: (item) => {
        return (
          <a href={item.link} className={aClassName} key={item.link + item.name}>
            {item.name}
          </a>
        );
      },
    })
  );
}

type CryptoItemProps = {
  name: string;
  address: string;
};

function CryptoItem({ name, address }: CryptoItemProps) {
  return (
    <CryptoAddressDisplay
      value={{
        cryptoAddress: {
          address,
          icon: name,
          name,
        },
      }}
    />
  );
}

const cryptoAddresses: Array<ReactNode> = [];
if (NEXT_PUBLIC_ADDRESS_ETH) {
  cryptoAddresses.push(
    <CryptoItem key="Ethereum" name="Ethereum" address={NEXT_PUBLIC_ADDRESS_ETH} />
  );
}

if (NEXT_PUBLIC_ADDRESS_BTC) {
  cryptoAddresses.push(
    <CryptoItem key="Bitcoin" name="Bitcoin" address={NEXT_PUBLIC_ADDRESS_BTC} />
  );
}

if (NEXT_PUBLIC_ADDRESS_SOL) {
  cryptoAddresses.push(<CryptoItem key="Solana" name="Solana" address={NEXT_PUBLIC_ADDRESS_SOL} />);
}

const cardSectionTitleItems: Array<string> = [];
const supportItems: Array<ReactNode> = [];

if (NEXT_PUBLIC_ENABLE_SPONSORS) {
  cardSectionTitleItems.push('Sponsor');
  supportItems.push(
    <span key="donate-sponsor">
      {' become a '}
      <a href="#card" className={aClassName}>
        Sponsor
      </a>
    </span>
  );
}

const donateItems: Array<ReactNode> = [];
if (NEXT_PUBLIC_ENABLE_ONE_TIME_CARD_DONATION) {
  cardSectionTitleItems.unshift('Card Donations');
  donateItems.push(
    <a href="#card" className={aClassName} key="donate-card">
      Card
    </a>
  );
}

if (NEXT_PUBLIC_ADDRESS_BTC || NEXT_PUBLIC_ADDRESS_ETH) {
  donateItems.push(
    <a href="#crypto" className={aClassName} key="donate-crypto">
      Crypto
    </a>
  );
}

const donateOptions = formatNodeList({
  items: donateItems,
  componentConstructor: (item) => item,
});

supportItems.push('$');

const supportOptionsRaw = formatNodeList({
  items: supportItems,
  componentConstructor: (item) => item,
});
const donateOptionsIdx = supportOptionsRaw.findIndex((v) => typeof v === 'string' && v === '$');
const supportOptions = [
  'If you want to support my open source work, or just want to buy me a coffee, you can ',
  ...supportOptionsRaw.slice(0, donateOptionsIdx),
  ' donate with ',
  ...donateOptions,
  ...supportOptionsRaw.slice(donateOptionsIdx + 1, supportOptionsRaw.length - 1),
];

export default async function Home() {
  const prices = await fetchPrices();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-20 sm:items-start dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            Donate
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-zinc-600 leading-8 dark:text-zinc-400">
              {supportOptions}
              <br />
              {workDescription}
            </p>
            {cryptoAddresses.length ? (
              <>
                <h2 id="crypto" className={h2ClassName}>
                  Crypto
                </h2>
                {NEXT_PUBLIC_STRING_CRYPTO_DESCRIPTION ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {NEXT_PUBLIC_STRING_CRYPTO_DESCRIPTION}
                  </p>
                ) : null}
                {cryptoAddresses}
              </>
            ) : null}
          </div>
          {NEXT_PUBLIC_ENABLE_SPONSORS || NEXT_PUBLIC_ENABLE_ONE_TIME_CARD_DONATION ? (
            <div className="flex flex-col gap-4">
              <h2 id="card" className={h2ClassName}>
                {cardSectionTitleItems.join(' & ')}
              </h2>
              {NEXT_PUBLIC_STRING_CARD_DESCRIPTION ? (
                <p className="max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
                  {NEXT_PUBLIC_STRING_CARD_DESCRIPTION}
                </p>
              ) : null}
              <StripeCheckout prices={prices} />
            </div>
          ) : null}
        </div>
      </main>
      <Footer className="flex w-full max-w-3xl px-2 py-4" />
    </div>
  );
}
