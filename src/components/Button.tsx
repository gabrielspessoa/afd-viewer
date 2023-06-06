'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type VariantsType = keyof typeof variants;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantsType;
  as?: any;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'rounded bg-primary-600 text-white border border-transparent hover:bg-primary-500 focus:ring-1 focus:border-primary-400 focus:ring-primary-400',
  outline:
    'rounded border bg-white border-gray-700 focus:border-primary-600 text-gray-100 bg-gray-800 hover:bg-gray-700',
  icon: 'h-8 w-8 p-0 hover:bg-zinc-700 active:bg-zinc-900 focus:ring-0 rounded-full flex justify-center items-center transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:text-zinc-600 disabled:hover:bg-transparent disabled:cursor-not-allowed',
};

const selectVariant = (variant: VariantsType) => variants[variant];

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type,
      children,
      className,
      variant = 'primary',
      as = 'button',
      fullWidth = false,
      ...rest
    },
    ref
  ) => {
    const Component = as;

    return (
      <Component
        type={type || 'button'}
        className={twMerge(
          'py-2 px-4 cursor-pointer focus:ring-1 focus:border-primary-600 focus:ring-primary-600 focus:outline-none transition duration-200 select-none',
          selectVariant(variant),
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
