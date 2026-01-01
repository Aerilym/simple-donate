'use client';

import { useState } from 'react';
import type { fetchPrices } from '@/app/actions/stripe';
import { NEXT_PUBLIC_ENABLE_ONE_TIME_CARD_DONATION, NEXT_PUBLIC_ENABLE_SPONSORS } from '@/lib/env';
import { Price } from '@/lib/stripeIds';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import Checkout from './checkout';

type Option = {
  priceId: Price | [Price, Price];
  title: string;
  description: string;
};

const options = [
  {
    priceId: Price.DONATE,
    title: 'One-time Donation',
    description: 'Donate any amount',
  },
  {
    priceId: [Price.BRONZE_M, Price.BRONZE_Y],
    title: 'Bronze Sponsor',
    description: '',
  },
  {
    priceId: [Price.SILVER_M, Price.SILVER_Y],
    title: 'Silver Sponsor',
    description: '',
  },
  {
    priceId: [Price.GOLD_M, Price.GOLD_Y],
    title: 'Gold Sponsor',
    description: '',
  },
] satisfies Array<Option>;

if (!NEXT_PUBLIC_ENABLE_ONE_TIME_CARD_DONATION) {
  options.shift();
}

function formatPrice(str: string) {
  const padded = str.padStart(3, '0'); // "005"
  const result = `${padded.slice(0, -2)}.${padded.slice(-2)}`;
  return result;
}

function isRecurringPriceId(priceId: Price | [Price, Price]) {
  return typeof priceId !== 'number';
}

function PriceOption({
  title,
  price,
  description,
  idx,
  setOption,
  disabled,
  selected,
}: {
  title: string;
  price?: string;
  description?: string;
  idx: number;
  setOption: (idx: number) => void;
  disabled?: boolean;
  selected?: boolean;
}) {
  return (
    <Button
      variant="outline"
      rounded="md"
      onClick={() => setOption(idx)}
      className={cn(
        'flex h-max w-50 flex-col gap-0.5',
        selected ? 'border-green-500 shadow-lg disabled:opacity-100 dark:border-green-500' : ''
      )}
      disabled={disabled || selected}
    >
      <span>{title}</span>
      {price ? <span>{price}</span> : null}
      <p className="font-normal text-xs">{description}</p>
    </Button>
  );
}

export function StripeCheckout({ prices }: { prices: Awaited<ReturnType<typeof fetchPrices>> }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [option, setOption] = useState<Option>(options[0]);
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const changeOption = (idx: number) => {
    setIsLoading(true);
    setOption(options[idx]);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleAnnual = () => {
    setIsAnnual((p) => !p);
    if (typeof option.priceId !== 'number') {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const isOptionRecurring = isRecurringPriceId(option.priceId);
  const priceId = isRecurringPriceId(option.priceId)
    ? option.priceId[isAnnual ? 1 : 0]
    : option.priceId;
  const switchDisabled = isLoading || !isOptionRecurring;
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row-reverse">
      {NEXT_PUBLIC_ENABLE_SPONSORS ? (
        <div className="flex flex-col flex-wrap gap-6 md:w-max">
          <div className="flex w-full items-center justify-center gap-2">
            <Label htmlFor="annualSwitch" disabled={switchDisabled}>
              Monthly
            </Label>
            <Switch
              id="annualSwitch"
              checked={isAnnual}
              onCheckedChange={toggleAnnual}
              disabled={switchDisabled}
            />
            <Label htmlFor="annualSwitch" disabled={switchDisabled}>
              Annual
            </Label>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 md:w-max md:flex-col">
            {options.map((props, idx) => {
              const optionPriceId = isRecurringPriceId(props.priceId)
                ? props.priceId[isAnnual ? 1 : 0]
                : props.priceId;

              const priceItem = prices[optionPriceId];

              let recurring = false;
              let price;
              if (priceItem) {
                let decimalAmount = priceItem.unit_amount_decimal;
                if (priceItem.recurring) {
                  recurring = true;
                  if (priceItem.recurring.interval === 'year' && priceItem.unit_amount) {
                    const monthlyPrice = Math.floor(priceItem.unit_amount / 12);
                    decimalAmount = monthlyPrice.toString();
                  }
                }
                const priceFormatted = decimalAmount ? formatPrice(decimalAmount) : null;

                if (priceFormatted) {
                  price = priceFormatted;
                  if (recurring) {
                    price += ' / mo.';
                  }
                }
              }

              return (
                <PriceOption
                  {...props}
                  key={props.title}
                  price={price}
                  idx={idx}
                  setOption={changeOption}
                  disabled={isLoading}
                  selected={optionPriceId === priceId}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      <Checkout priceId={priceId} />
    </div>
  );
}
