import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, Leaf, Shield } from 'lucide-react';
import { categorizeIngredients } from '../../services/ingredientAnalysis';

const IngredientAnalysis = ({ ingredients = [], analysis = null }) => {
    // Add default empty categories if analysis is null
    const defaultCategories = {
        safe: [],
        concerning: [],
        allergens: [],
        eco_friendly: [],
        eco_concerning: []
    };

    const categories = analysis ? categorizeIngredients(ingredients, analysis) : defaultCategories;

    const renderIngredientList = (items = [], icon, colorClass) => {
        if (!Array.isArray(items)) return null;

        return items.map((item, index) => (
            <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-2 p-2 rounded-lg ${colorClass}`}
            >
                {React.createElement(icon, { className: 'w-4 h-4' })}
                <span>{item}</span>
            </motion.div>
        ));
    };

    if (!ingredients || ingredients.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                No ingredients available for analysis
            </div>
        );
    }

    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ingredient Analysis
            </h3>

            <div className="space-y-6">
                {/* Safe Ingredients */}
                {categories.safe.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Safe Ingredients
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {renderIngredientList(
                                categories.safe,
                                Check,
                                'bg-green-50 text-green-700'
                            )}
                        </div>
                    </div>
                )}

                {/* Concerning Ingredients */}
                {categories.concerning.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Ingredients of Concern
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {renderIngredientList(
                                categories.concerning,
                                AlertTriangle,
                                'bg-amber-50 text-amber-700'
                            )}
                        </div>
                    </div>
                )}

                {/* Allergens */}
                {categories.allergens.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Potential Allergens
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {renderIngredientList(
                                categories.allergens,
                                Shield,
                                'bg-red-50 text-red-700'
                            )}
                        </div>
                    </div>
                )}

                {/* Eco-Friendly Ingredients */}
                {categories.eco_friendly.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Eco-Friendly Ingredients
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {renderIngredientList(
                                categories.eco_friendly,
                                Leaf,
                                'bg-emerald-50 text-emerald-700'
                            )}
                        </div>
                    </div>
                )}

                {/* No Analysis Available */}
                {Object.values(categories).every(array => array.length === 0) && (
                    <div className="text-center text-gray-500 py-4">
                        No detailed analysis available for these ingredients
                    </div>
                )}
            </div>
        </div>
    );
};

export default IngredientAnalysis;