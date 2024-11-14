// Common allergens database
const commonAllergens = {
    'milk': [
        'milk',
        'dairy',
        'whey',
        'casein',
        'lactose',
        'cream',
        'butter',
        'cheese',
        'yogurt'
    ],
    'eggs': [
        'egg',
        'albumin',
        'globulin',
        'lecithin',
        'livetin',
        'lysozyme'
    ],
    'peanuts': [
        'peanut',
        'arachis',
        'nuts',
        'goober',
        'groundnut'
    ],
    'tree nuts': [
        'almond',
        'cashew',
        'walnut',
        'pecan',
        'pistachio',
        'macadamia',
        'hazelnut',
        'brazil nut'
    ],
    'soy': [
        'soy',
        'soya',
        'glycine',
        'edamame',
        'tofu',
        'tempeh'
    ],
    'wheat': [
        'wheat',
        'flour',
        'gluten',
        'spelt',
        'durum',
        'kamut',
        'semolina'
    ],
    'fish': [
        'fish',
        'cod',
        'salmon',
        'tuna',
        'tilapia',
        'bass',
        'anchovy'
    ],
    'shellfish': [
        'shellfish',
        'crab',
        'lobster',
        'shrimp',
        'prawn',
        'crayfish',
        'oyster',
        'mussel',
        'clam'
    ],
    'sesame': [
        'sesame',
        'tahini',
        'sesamol',
        'gingelly'
    ],
    'sulfites': [
        'sulfite',
        'sulphite',
        'sulfur dioxide',
        'metabisulfite',
        'metabisulphite'
    ]
};

/**
 * Calculate safety score based on detected warnings
 * @param {Array} warnings - Array of warning objects
 * @returns {number} - Safety score from 0 to 100
 */
const calculateSafetyScore = (warnings) => {
    // Base score of 100
    let score = 100;

    // Deduct points based on warning types
    warnings.forEach(warning => {
        switch (warning.type) {
            case 'high':
                score -= 30; // Severe deduction for user allergens
                break;
            case 'warning':
                score -= 10; // Moderate deduction for cross-contamination
                break;
            case 'info':
                score -= 5; // Minor deduction for common allergens
                break;
        }
    });

    // Ensure score stays within 0-100 range
    return Math.max(0, Math.min(100, score));
};

/**
 * Check ingredients list for allergens and generate warnings
 * @param {Array<string>} ingredients - List of ingredients to check
 * @param {Array<string>} userAllergens - List of user-specific allergens
 * @returns {Object} - Analysis results including detected allergens and warnings
 */
export const checkAllergens = (ingredients, userAllergens = []) => {
    const detectedAllergens = new Set();
    const warnings = [];

    // Normalize ingredients and user allergens
    const normalizedIngredients = ingredients.map(i => i.toLowerCase().trim());
    const normalizedUserAllergens = userAllergens.map(a => a.toLowerCase().trim());

    // Check each ingredient against common allergens
    normalizedIngredients.forEach(ingredient => {
        for (const [allergenType, variants] of Object.entries(commonAllergens)) {
            if (variants.some(variant => ingredient.includes(variant))) {
                detectedAllergens.add(allergenType);

                // Add extra warning if this is a user-specific allergen
                if (normalizedUserAllergens.includes(allergenType) ||
                    normalizedUserAllergens.some(a => variants.includes(a))) {
                    warnings.push({
                        type: 'high',
                        allergen: allergenType,
                        ingredient: ingredient,
                        message: `Contains ${allergenType} - User Allergen Alert!`
                    });
                } else {
                    warnings.push({
                        type: 'info',
                        allergen: allergenType,
                        ingredient: ingredient,
                        message: `Contains ${allergenType}`
                    });
                }
            }
        }
    });

    // Check for potential cross-contamination phrases
    const crossContaminationPhrases = [
        'may contain',
        'processed in a facility',
        'manufactured on shared equipment',
        'traces of'
    ];

    const normalizedText = ingredients.join(' ').toLowerCase();
    crossContaminationPhrases.forEach(phrase => {
        if (normalizedText.includes(phrase)) {
            warnings.push({
                type: 'warning',
                message: 'Potential cross-contamination warning detected'
            });
        }
    });

    return {
        detected: Array.from(detectedAllergens),
        warnings,
        hasUserAllergens: warnings.some(w => w.type === 'high'),
        safetyScore: calculateSafetyScore(warnings)
    };
};

export default {
    checkAllergens
};