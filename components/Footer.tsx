import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string }) {
  return (
    <div className={cn('w-full flex-col flex-wrap', className)}>
      <p className="text-sm text-zinc-600">
        Created by{' '}
        <a href="https://aerilym.com/" className="font-semibold">
          Aerilym
        </a>
        . Host your own customisable donation & sponsorship page with{' '}
        <a href="https://github.com/aerilym/simple-donate" className="font-semibold">
          Simple Donate
        </a>
        , its free and open source.
      </p>
    </div>
  );
}
