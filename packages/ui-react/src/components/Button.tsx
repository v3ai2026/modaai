import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const style = {
    padding: '0.75rem 1.5rem',
    backgroundColor: variant === 'primary' ? '#8ab4f8' : 'transparent',
    color: variant === 'primary' ? '#020202' : '#8ab4f8',
    border: variant === 'secondary' ? '1px solid #8ab4f8' : 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};
