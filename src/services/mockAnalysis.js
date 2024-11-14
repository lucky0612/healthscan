export const getMockAnalysis = (ingredients) => {
    return {
        health: {
            score: 75,
            allergens: ['soy', 'wheat'],
            benefits: [
                'Contains essential vitamins',
                'Good source of fiber',
                'Rich in antioxidants'
            ],
            concerns: [
                'Contains artificial preservatives',
                'High sodium content',
                'Added sugars'
            ],
            recommendations: [
                'Consider natural alternatives',
                'Look for low-sodium options',
                'Check for organic variants'
            ]
        },
        environmental: {
            score: 65,
            positives: [
                'Uses recyclable packaging',
                'Sustainably sourced ingredients',
                'Local production'
            ],
            concerns: [
                'Plastic packaging components',
                'Non-renewable resources used',
                'High water usage in production'
            ],
            recommendations: [
                'Look for eco-friendly packaging',
                'Choose locally sourced products',
                'Support sustainable brands'
            ]
        },
        timestamp: new Date().toISOString(),
        ingredientsAnalyzed: ingredients.length
    };
};

export default {
    getMockAnalysis
};