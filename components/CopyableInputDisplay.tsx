import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { CopyToClipboardButton, type CopyToClipboardButtonProps } from './CopyToClipboardButton';
import { InputWithEndAdornment } from './ui/input';

export type CopyableInputDisplayProps = React.ComponentProps<'input'> & {
  copyToClipboardProps: CopyToClipboardButtonProps;
};

const CopyableInputDisplay = forwardRef<HTMLInputElement, CopyableInputDisplayProps>(
  ({ className, copyToClipboardProps, ...props }, ref) => {
    return (
      <InputWithEndAdornment
        {...props}
        ref={ref}
        className={cn(className, 'pe-8')}
        readOnly={true}
        endAdornment={
          <div className="flex items-center">
            <CopyToClipboardButton {...copyToClipboardProps} />
          </div>
        }
      />
    );
  }
);

CopyableInputDisplay.displayName = 'CopyableInputDisplay';

export { CopyableInputDisplay };
