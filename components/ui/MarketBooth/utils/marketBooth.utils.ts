import { Coins } from '@/types/character';

export type priceObject = {
  label: string;
  shortLabel: string;
  amount: number;
};

export const formatPriceDisplay = (price: Coins): priceObject => {
  let formattedPrice: priceObject = {
    label: '',
    shortLabel: '',
    amount: 0,
  };

  if (price.gold && price.gold > 0) {
    formattedPrice = {
      label: `${price.gold} Gold`,
      shortLabel: `${price.gold}G`,
      amount: price.gold,
    };
  } else if (price.silver && price.silver > 0) {
    formattedPrice = {
      label: `${price.silver} Silver`,
      shortLabel: `${price.silver}S`,
      amount: price.silver,
    };
  } else if (price.copper && price.copper > 0) {
    formattedPrice = {
      label: `${price.copper} Copper`,
      shortLabel: `${price.copper}C`,
      amount: price.copper,
    };
  }
  return formattedPrice;
};

export const canAffordItem = (
  characterCoins: Coins | undefined,
  price: Coins
): boolean => {
  if (!characterCoins) {
    return false;
  }

  if (price.gold && characterCoins.gold < price.gold) {
    return false;
  }
  if (price.silver && characterCoins.silver < price.silver) {
    return false;
  }
  if (price.copper && characterCoins.copper < price.copper) {
    return false;
  }
  return true;
};
