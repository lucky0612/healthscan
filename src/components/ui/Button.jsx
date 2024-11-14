import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: {
        base: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
        hover: "hover:from-green-600 hover:to-emerald-700",
        shadow: "shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
    },
    secondary: {
        base: "bg-white text-gray-700 border border-gray-200",
        hover: "hover:bg-gray-50",
        shadow: "shadow-lg"
    },
    danger: {
        base: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
        hover: "hover:from-red-600 hover:to-rose-700",
        shadow: "shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
    },
    outline: {
        base: "bg-transparent border-2 border-green-500 text-green-600",
        hover: "hover:bg-green-50",
        shadow: "hover:shadow-lg hover:shadow-green-500/20"
    }
};

const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
};

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon: Icon,
    isLoading = false,
    disabled = false,
    onClick,
    type = 'button',
    ...props
}) => {
    const style = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`
        ${style.base}
        ${style.hover}
        ${style.shadow}
        ${sizeClass}
        rounded-xl
        flex
        items-center
        justify-center
        transition-all
        duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}
        ${className}
      `}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {Icon && <Icon className="w-5 h-5 mr-2" />}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default Button;