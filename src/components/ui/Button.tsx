import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'btn-glossy',
        destructive:
          'bg-gradient-to-b from-red-500 via-red-600 to-red-700 border border-red-800 text-white shadow-md hover:from-red-400 hover:via-red-500 hover:to-red-600 active:from-red-700 active:to-red-500',
        outline:
          'border-2 border-[#666] bg-gradient-to-b from-[#F8F8F8] to-[#E0E0E0] text-[#333] shadow-md hover:from-white hover:to-[#F0F0F0] active:from-[#D0D0D0] active:to-[#E8E8E8]',
        secondary:
          'btn-glossy-gold',
        ghost: 'hover:bg-white/20 hover:text-white text-white/80',
        link: 'text-[var(--gold)] underline-offset-4 hover:underline hover:text-[var(--gold-light)]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
