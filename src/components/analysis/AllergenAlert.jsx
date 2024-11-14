import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const AllergenAlert = ({ allergens = [], onDismiss }) => {
    if (!allergens.length) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 relative"
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                        Allergen Alert
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>This product contains potential allergens:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            {allergens.map((allergen, index) => (
                                <motion.li
                                    key={allergen}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {allergen}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
                {onDismiss && (
                    <div className="flex-shrink-0 self-start">
                        <button
                            onClick={onDismiss}
                            className="rounded-md bg-red-50 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            <span className="sr-only">Dismiss</span>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Additional Information */}
            <div className="mt-4 text-sm text-red-700">
                <p className="font-medium">
                    Please consult with a healthcare professional if you have allergies or sensitivities.
                </p>
            </div>

            {/* Visual Indicator */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"
            />
        </motion.div>
    );
};

export default AllergenAlert;