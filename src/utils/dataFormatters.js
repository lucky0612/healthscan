// Format health score data
export const formatHealthScore = (score) => {
    if (typeof score !== 'number') return 0;
    return Math.round(Math.max(0, Math.min(100, score)));
};

// Format percentage values
export const formatPercentage = (value, decimals = 1) => {
    if (typeof value !== 'number') return '0%';
    return `${value.toFixed(decimals)}%`;
};

// Format ingredient lists
export const formatIngredientList = (ingredients) => {
    if (!Array.isArray(ingredients)) return [];

    return ingredients
        .map(ingredient => ingredient.trim())
        .filter(Boolean)
        .map(ingredient => ({
            name: ingredient,
            formatted: ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
        }));
};

// Helper functions for categorization
const categorizeBenefit = (benefit) => {
    if (!benefit) return 'general';
    const text = benefit.toLowerCase();
    if (text.includes('nutrient') || text.includes('vitamin')) return 'nutritional';
    if (text.includes('skin') || text.includes('hair')) return 'cosmetic';
    return 'general';
};

const categorizeConcernSeverity = (concern) => {
    if (!concern) return 'low';
    const text = concern.toLowerCase();
    if (text.includes('high') || text.includes('severe')) return 'high';
    if (text.includes('moderate')) return 'medium';
    return 'low';
};

const categorizeRecommendationType = (recommendation) => {
    if (!recommendation) return 'info';
    const text = recommendation.toLowerCase();
    if (text.includes('avoid') || text.includes('stop')) return 'warning';
    if (text.includes('consider') || text.includes('try')) return 'suggestion';
    return 'info';
};

const categorizeEnvironmentalImpact = (positive) => {
    if (!positive) return 'low';
    const text = positive.toLowerCase();
    if (text.includes('renewable') || text.includes('sustainable')) return 'high';
    if (text.includes('biodegradable')) return 'medium';
    return 'low';
};

const categorizeEnvironmentalSeverity = (concern) => {
    if (!concern) return 'low';
    const text = concern.toLowerCase();
    if (text.includes('toxic') || text.includes('pollutant')) return 'high';
    if (text.includes('non-renewable') || text.includes('waste')) return 'medium';
    return 'low';
};

// Format array-based data
const formatBenefits = (benefits = []) => {
    return benefits
        .filter(Boolean)
        .map(benefit => ({
            text: benefit,
            category: categorizeBenefit(benefit)
        }));
};

const formatConcerns = (concerns = []) => {
    return concerns
        .filter(Boolean)
        .map(concern => ({
            text: concern,
            severity: categorizeConcernSeverity(concern)
        }));
};

const formatRecommendations = (recommendations = []) => {
    return recommendations
        .filter(Boolean)
        .map(recommendation => ({
            text: recommendation,
            type: categorizeRecommendationType(recommendation)
        }));
};

const formatEnvironmentalPositives = (positives = []) => {
    return positives
        .filter(Boolean)
        .map(positive => ({
            text: positive,
            impact: categorizeEnvironmentalImpact(positive)
        }));
};

const formatEnvironmentalConcerns = (concerns = []) => {
    return concerns
        .filter(Boolean)
        .map(concern => ({
            text: concern,
            severity: categorizeEnvironmentalSeverity(concern)
        }));
};

// Format allergen data
const formatAllergenData = (allergenData, userAllergies = []) => {
    if (!allergenData) return { detected: [], warnings: [] };

    const detected = allergenData.detected || [];
    const warnings = allergenData.warnings || [];

    return {
        detected,
        warnings,
        userAllergens: detected.filter(allergen =>
            userAllergies.includes(allergen)
        ),
        safetyScore: allergenData.safetyScore || 100
    };
};

// Generate summary and recommendations
const getRating = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
};

const generateShortSummary = (score, allergenCount) => {
    if (score >= 80) return 'This product shows excellent overall qualities.';
    if (score >= 60) return 'This product has good qualities with some considerations.';
    if (allergenCount > 0) return 'This product contains potential allergens and should be used with caution.';
    return 'This product has several aspects that could be improved.';
};

const generateTopRecommendations = (healthScore, environmentalScore, allergenCount) => {
    const recommendations = [];

    if (allergenCount > 0) {
        recommendations.push('Check ingredient list carefully for allergens');
    }

    if (healthScore < 60) {
        recommendations.push('Consider alternatives with fewer synthetic ingredients');
    }

    if (environmentalScore < 60) {
        recommendations.push('Look for more environmentally sustainable options');
    }

    return recommendations;
};

const generateSummary = ({ healthScore, environmentalScore, allergenCount }) => {
    const overallScore = Math.round((healthScore + environmentalScore) / 2);

    return {
        score: overallScore,
        rating: getRating(overallScore),
        shortSummary: generateShortSummary(overallScore, allergenCount),
        recommendations: generateTopRecommendations(healthScore, environmentalScore, allergenCount)
    };
};

// Main formatting function
export const formatAnalysisData = ({
    ingredients,
    allergens,
    health,
    environmental,
    userProfile
}) => {
    return {
        timestamp: new Date().toISOString(),
        ingredients: formatIngredientList(ingredients),

        health: {
            score: formatHealthScore(health?.score),
            benefits: formatBenefits(health?.benefits),
            concerns: formatConcerns(health?.concerns),
            recommendations: formatRecommendations(health?.recommendations),
            allergens: formatAllergenData(allergens, userProfile?.allergies)
        },

        environmental: {
            score: formatHealthScore(environmental?.score),
            positives: formatEnvironmentalPositives(environmental?.positives),
            concerns: formatEnvironmentalConcerns(environmental?.concerns),
            recommendations: formatRecommendations(environmental?.recommendations),
            sustainability: {
                score: formatHealthScore(environmental?.sustainability?.score),
                rating: environmental?.sustainability?.rating || 'Not Rated'
            }
        },

        summary: generateSummary({
            healthScore: health?.score,
            environmentalScore: environmental?.score,
            allergenCount: allergens?.detected?.length
        })
    };
};

// Export all necessary functions
export default {
    formatAnalysisData,
    formatHealthScore,
    formatPercentage,
    formatIngredientList
};