import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'flex-1 w-full border border-gray-300 rounded-lg px-4 py-2.5',
                        'focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500',
                        'outline-none transition-all placeholder:text-gray-400',
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';
