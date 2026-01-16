import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'github' | 'white';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-black hover:bg-gray-800 text-white',
            secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-600',
            outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
            ghost: 'text-gray-500 hover:text-gray-900 bg-transparent',
            github: 'bg-gray-900 hover:bg-black text-white',
            white: 'bg-white hover:bg-gray-50 text-gray-700 border border-transparent shadow-sm'
        };

        const sizes = {
            sm: 'py-1.5 px-3 text-xs',
            md: 'py-2.5 px-4 text-sm',
            lg: 'py-3 px-6 text-base'
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'flex items-center justify-center gap-2 font-medium rounded-lg transition-all',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
