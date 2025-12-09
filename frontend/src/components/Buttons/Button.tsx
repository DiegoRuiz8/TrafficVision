// src/components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-semibold focus:outline-none focus:ring';
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100';
  const sizeStyles =
    size === 'small'
      ? 'px-2 py-1 text-sm'
      : size === 'large'
      ? 'px-6 py-3 text-lg'
      : 'px-4 py-2';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
