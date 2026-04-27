import Link from 'next/link';
import { ReactNode } from 'react';

interface BtnProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Btn({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled = false,
}: BtnProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary: 'text-black hover:opacity-90 active:scale-95',
    outline: 'bg-transparent border hover:bg-gray-50 active:scale-95',
    ghost: 'bg-transparent hover:bg-gray-100 active:scale-95',
  };

  const sizes = {
    sm: 'h-8 px-4 text-xs gap-1.5',
    md: 'h-10 px-5 text-sm gap-2',
    lg: 'h-12 px-7 text-base gap-2.5',
  };

  const variantStyles = {
    primary: { background: 'var(--green)', color: '#0d0d0d' },
    outline: { borderColor: 'var(--border-strong)', color: 'var(--black)' },
    ghost: { color: 'var(--black)' },
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} style={variantStyles[variant]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={variantStyles[variant]}
    >
      {children}
    </button>
  );
}
