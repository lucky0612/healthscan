import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ title, icon: Icon, items = [], variant = 'default' }) => {
    const variants = {
        default: {
            background: 'bg-white',
            border: 'border-gray-200',
            icon: 'bg-gray-100 text-gray-600',
            item: 'bg-gray-50 text-gray-700'
        },
        success: {
            background: 'bg-white',
            border: 'border-green-100',
            icon: 'bg-green-100 text-green-600',
            item: 'bg-green-50 text-green-700'
        },
        warning: {
            background: 'bg-white',
            border: 'border-amber-100',
            icon: 'bg-amber-100 text-amber-600',
            item: 'bg-amber-50 text-amber-700'
        },
        info: {
            background: 'bg-white',
            border: 'border-blue-100',
            icon: 'bg-blue-100 text-blue-600',
            item: 'bg-blue-50 text-blue-700'
        },
        danger: {
            background: 'bg-white',
            border: 'border-red-100',
            icon: 'bg-red-100 text-red-600',
            item: 'bg-red-50 text-red-700'
        }
    };

    const style = variants[variant];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl shadow-lg overflow-hidden ${style.background} border ${style.border}`}
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${style.icon} flex items-center justify-center`}>
                        {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-3 rounded-lg ${style.item}`}
                        >
                            {item}
                        </motion.div>
                    ))}
                    {items.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                            No information available
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default InfoCard;