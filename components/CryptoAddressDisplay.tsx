import { cn } from '@/lib/utils';
import { CopyableInputDisplay } from './CopyableInputDisplay';
import { ArbitrumIcon } from './icons/ArbitrumIcon';
import { BitcoinIcon } from './icons/BitcoinIcon';
import { BNBIcon } from './icons/BNBIcon';
import { EthIcon } from './icons/EthIcon';
import { SolanaIcon } from './icons/SolIcon';
import type { InputProps } from './ui/input';

type CryptoAddressDisplaySchemaType = {
  cryptoAddress: {
    icon: string;
    name: string;
    address: string;
  };
};

function getIcon(value: CryptoAddressDisplaySchemaType) {
  if (!value.cryptoAddress?.icon) {
    return EthIcon;
  }
  switch (value.cryptoAddress.icon) {
    case 'Bitcoin':
      return BitcoinIcon;
    case 'BNB':
      return BNBIcon;
    case 'Arbitrum':
      return ArbitrumIcon;
    case 'Solana':
      return SolanaIcon;
    default:
      return EthIcon;
  }
}

export function CryptoAddressDisplay({
  value,
}: {
  value: CryptoAddressDisplaySchemaType;
} & Omit<InputProps, 'value'>) {
  if (!value.cryptoAddress) {
    console.warn('Missing crypto address for crypto display');
    return null;
  }

  const IconComp = getIcon(value);

  return (
    <div
      className={cn(
        'group',
        'flex w-full flex-col align-middle md:flex-row md:items-center',
        'gap-2'
      )}
    >
      <div className="flex flex-row items-start gap-1 align-middle md:hidden">
        <IconComp className="h-5 w-5" />
        <span className="font-semibold text-base md:text-lg">{value.cryptoAddress.name}</span>
      </div>
      <IconComp className="hidden h-9 w-9 md:block" />
      <CopyableInputDisplay
        className="light:text-black text-xs md:text-sm"
        value={value.cryptoAddress.address}
        copyToClipboardProps={{
          textToCopy: value.cryptoAddress.address,
          className: 'hover:bg-transparent hover:stroke-primary hover:text-primary',
        }}
      />
    </div>
  );
}
