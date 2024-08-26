import React, { ReactNode } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn--large'];

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  buttonStyle?: string;
  buttonSize?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  buttonStyle,
  buttonSize,
  className 
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle || '')
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize || '')
    ? buttonSize
    : SIZES[0];

  return (
    <Link to='/sign-up' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${className}`} 
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
