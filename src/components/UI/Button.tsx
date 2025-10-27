import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  href,
  fullWidth = false,
  disabled = false
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-montserrat font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: `bg-gradient-to-r ${designTokens.colors.services.domiciliation.gradient} text-white hover:shadow-xl focus:ring-orange-500`,
    secondary: "backdrop-blur-xl bg-white/[0.04] text-white border border-white/[0.12] hover:bg-white/[0.08] hover:border-white/[0.16] focus:ring-white/50",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500",
    ghost: "bg-transparent text-white hover:bg-white/10 focus:ring-white/50"
  };

  const sizes = {
    sm: designTokens.buttons.size.sm,
    md: designTokens.buttons.size.md,
    lg: designTokens.buttons.size.lg,
  };

  const radius = designTokens.buttons.radius.large;
  const transition = designTokens.animations.transition.fast;
  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${radius} ${transition} ${widthClass} ${className}`;

  const iconClasses = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const iconMargin = iconPosition === 'left' ? 'mr-2' : 'ml-2';

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className={`${iconClasses} ${iconMargin}`} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={`${iconClasses} ${iconMargin}`} />}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
