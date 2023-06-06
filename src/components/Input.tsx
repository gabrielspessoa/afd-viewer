import { Icon } from '@phosphor-icons/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: Icon;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, type = 'text', icon, ...rest },
  ref
) {
  const IconComponent = icon;

  return (
    <div className='relative w-full'>
      <input
        {...rest}
        type={type}
        ref={ref}
        className={twMerge(
          'bg-zinc-600 border border-transparent border-zinc-600 focus:border-indigo-600 focus:outline-none ring-1 ring-transparent focus:ring-indigo-600 text-sm w-full rounded transition py-1.5 px-3 duration-200 font-normal',
          IconComponent && 'pl-10',
          className
        )}
      />
      {IconComponent && (
        <span className='absolute -translate-y-1/2 pointer-events-none left-3 top-1/2'>
          <IconComponent size={16} />
        </span>
      )}
    </div>
  );
});

export default Input;
