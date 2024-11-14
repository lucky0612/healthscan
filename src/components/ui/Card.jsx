import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    variant = 'default',
    hover = true,
    animate = true,
    icon: Icon,
    title,
    subtitle,
    footer,
    onClick
}) => {
    const variants = {
        default: {
            background: 'bg-white',
            border: 'border border-gray-100',
            shadow: 'shadow-lg',
            hover: hover ? 'hover:shadow-xl hover:-translate-y-0.5' : ''
        },
        transparent: {
            background: 'bg-white/80 backdrop-blur-lg',
            border: 'border border-gray-100',
            shadow: 'shadow-lg',
            hover: hover ? 'hover:shadow-xl hover:-translate-y-0.5' : ''
        },
        solid: {
            background: 'bg-gray-50',
            border: 'border-none',
            shadow: 'shadow-none',
            hover: hover ? 'hover:bg-gray-100' : ''
        },
        success: {
            background: 'bg-green-50',
            border: 'border border-green-100',
            shadow: 'shadow-lg shadow-green-500/10',
            hover: hover ? 'hover:shadow-green-500/20 hover:-translate-y-0.5' : ''
        },
        warning: {
            background: 'bg-amber-50',
            border: 'border border-amber-100',
            shadow: 'shadow-lg shadow-amber-500/10',
            hover: hover ? 'hover:shadow-amber-500/20 hover:-translate-y-0.5' : ''
        },
        error: {
            background: 'bg-red-50',
            border: 'border border-red-100',
            shadow: 'shadow-lg shadow-red-500/10',
            hover: hover ? 'hover:shadow-red-500/20 hover:-translate-y-0.5' : ''
        }
    };

    const style = variants[variant];

    const cardContent = (
        <>
            {(Icon || title || subtitle) && (
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        {Icon && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                        )}
                        <div>
                            {title && (
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-gray-600">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="p-6">
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    {footer}
                </div>
            )}
        </>
    );

    const cardClasses = `
    rounded-2xl
    overflow-hidden
    transition-all
    duration-200
    ${style.background}
    ${style.border}
    ${style.shadow}
    ${style.hover}
    ${className}
  `;

    if (!animate) {
        return (
            <div className={cardClasses} onClick={onClick}>
                {cardContent}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cardClasses}
            onClick={onClick}
        >
            {cardContent}
        </motion.div>
    );
};

export default Card;