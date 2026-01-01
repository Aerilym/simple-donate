import {
  NEXT_PUBLIC_STRIPE_PRICE_ID_DONATE,
  NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_BRONZE_M,
  NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_BRONZE_Y,
  NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_GOLD_M,
  NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_GOLD_Y,
  NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_SILVER_M,
  NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_SILVER_Y,
} from './env';

export enum Price {
  NIL = 0,
  DONATE = 1,
  BRONZE_M = 2,
  BRONZE_Y = 3,
  SILVER_M = 4,
  SILVER_Y = 5,
  GOLD_M = 6,
  GOLD_Y = 7,
}

export function getPriceFromPriceId(priceId: Price) {
  switch (priceId) {
    case Price.DONATE:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_DONATE;
    case Price.BRONZE_M:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_BRONZE_M;
    case Price.BRONZE_Y:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_BRONZE_Y;
    case Price.SILVER_M:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_SILVER_M;
    case Price.SILVER_Y:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_SILVER_Y;
    case Price.GOLD_M:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_GOLD_M;
    case Price.GOLD_Y:
      return NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_GOLD_Y;
    default:
      throw new Error(`Invalid price: ${priceId}`);
  }
}

export function getPriceIdFromPrice(price: string) {
  switch (price) {
    case NEXT_PUBLIC_STRIPE_PRICE_ID_DONATE:
      return Price.DONATE;
    case NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_BRONZE_M:
      return Price.BRONZE_M;
    case NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_BRONZE_Y:
      return Price.BRONZE_Y;
    case NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_SILVER_M:
      return Price.SILVER_M;
    case NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_SILVER_Y:
      return Price.SILVER_Y;
    case NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_GOLD_M:
      return Price.GOLD_M;
    case NEXT_PUBLIC_STRIPE_PRICE_ID_SPONSOR_GOLD_Y:
      return Price.GOLD_Y;
    default:
      return Price.NIL;
  }
}

export function isRecurring(priceId: Price) {
  return (
    priceId === Price.BRONZE_M ||
    priceId === Price.BRONZE_Y ||
    priceId === Price.SILVER_M ||
    priceId === Price.SILVER_Y ||
    priceId === Price.GOLD_M ||
    priceId === Price.GOLD_Y
  );
}
