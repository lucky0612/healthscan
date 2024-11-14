import axios from 'axios';

// Environmental impact database (simplified for MVP)
const environmentalImpactDB = {
    // Preservatives and synthetic ingredients
    'sodium benzoate': { impact: 'high', concern: 'synthetic preservative' },
    'bht': { impact: 'high', concern: 'synthetic antioxidant' },
    'parabens': { impact: 'high', concern: 'synthetic preservative' },

    // Natural ingredients
    'aloe vera': { impact: 'low', positive: 'sustainable plant-based' },
    'coconut oil': { impact: 'medium', positive: 'renewable resource' },
    'shea butter': { impact: 'low', positive: 'sustainable harvesting' },

    // Common chemicals
    'sls': { impact: 'high', concern: 'aquatic toxicity' },
    'petroleum': { impact: 'high', concern: 'non-renewable resource' },
    'microbeads': { impact: 'high', concern: 'plastic pollution' }
};

// Environmental scoring criteria
const scoringCriteria = {
    sustainabilityFactors: {
        renewable: 10,
        biodegradable: 10,
        natural: 8,
        synthetic: -5,
        pollutant: -10
    },
    impactScores: {
        low: 10,
        medium: 5,
        high: -5
    }
};

/**
 * Generate recommendations based on environmental analysis
 * @param {string[]} concerns - List of environmental concerns
 * @param {string[]} positives - List of positive environmental impacts
 * @returns {string[]} Array of recommendations
 */
const generateRecommendations = (concerns, positives) => {
    const recommendations = [];

    // Generate recommendations based on concerns
    if (concerns.length > 0) {
        recommendations.push(
            'Consider alternatives to synthetic preservatives',
            'Look for products with natural, biodegradable ingredients'
        );
    }

    // Add positive reinforcement
    if (positives.length > 0) {
        recommendations.push(
            'Continue choosing products with natural, sustainable ingredients',
            'Support brands that prioritize environmental responsibility'
        );
    }

    // Add general recommendations
    recommendations.push(
        'Check for eco-friendly packaging options',
        'Research brand sustainability practices'
    );

    return recommendations;
};

/**
 * Get sustainability rating based on score
 * @param {number} score - Normalized sustainability score (0-100)
 * @returns {string} Rating label
 */
const getSustainabilityRating = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
};

/**
 * Analyze environmental impact of ingredients
 * @param {string[]} ingredients - Array of ingredient names
 * @returns {Promise<Object>} Environmental impact analysis
 */
export const getEnvironmentalData = async (ingredients) => {
    try {
        // Initialize scores and impact data
        let sustainabilityScore = 0;
        const concerns = [];
        const positives = [];

        // Analyze each ingredient
        ingredients.forEach(ingredient => {
            const normalizedIngredient = ingredient.toLowerCase().trim();
            const impactData = environmentalImpactDB[normalizedIngredient];

            if (impactData) {
                // Calculate impact score
                sustainabilityScore += scoringCriteria.impactScores[impactData.impact] || 0;

                // Record concerns and positives
                if (impactData.concern) {
                    concerns.push(`${ingredient}: ${impactData.concern}`);
                }
                if (impactData.positive) {
                    positives.push(`${ingredient}: ${impactData.positive}`);
                }
            }
        });

        // Normalize score to 0-100 range
        const normalizedScore = Math.max(0, Math.min(100, (sustainabilityScore + 50) * 2));

        // Generate recommendations based on analysis
        const recommendations = generateRecommendations(concerns, positives);

        return {
            score: Math.round(normalizedScore),
            positives,
            concerns,
            recommendations,
            sustainability: {
                score: normalizedScore,
                rating: getSustainabilityRating(normalizedScore)
            },
            packaging: {
                score: 0, // To be implemented with packaging analysis
                recommendations: []
            },
            carbonFootprint: {
                score: 0, // To be implemented with carbon footprint calculation
                recommendations: []
            }
        };
    } catch (error) {
        console.error('Error analyzing environmental impact:', error);
        throw new Error('Failed to analyze environmental impact');
    }
};

// Export default object with named functions
export default {
    getEnvironmentalData
};