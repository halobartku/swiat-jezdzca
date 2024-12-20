import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'reversed';
  size?: 'default' | 'large';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className, children, ...props }, ref) => {
    const baseStyles = "text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap";
    
    const variants = {
      primary: "bg-gradient-to-r from-[#ff4d4d] to-white",
      reversed: "bg-gradient-to-r from-white to-[#ff4d4d]",
    };

    const sizes = {
      default: "py-2 px-5 text-sm md:text-base",
      large: "py-3 px-8 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
