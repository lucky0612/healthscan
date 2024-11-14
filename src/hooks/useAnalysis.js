import { useState, useCallback } from 'react';
import { analyzeIngredients } from '../services/ingredientAnalysis';
import { getEnvironmentalData } from '../services/environmentalData';
import { checkAllergens } from '../utils/allergenCheck';
import { formatAnalysisData } from '../utils/dataFormatters';

export const useAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const analyzeProduct = useCallback(async (ingredients, userProfile = {}) => {
        setIsAnalyzing(true);
        setProgress(0);
        setError(null);

        try {
            // Step 1: Check allergens
            setProgress(20);
            const allergenResults = await checkAllergens(ingredients, userProfile.allergies);

            // Step 2: Analyze ingredients for health impact
            setProgress(40);
            const healthAnalysis = await analyzeIngredients(ingredients);

            // Step 3: Get environmental impact data
            setProgress(60);
            const environmentalData = await getEnvironmentalData(ingredients);

            // Step 4: Format and combine all data
            setProgress(80);
            const formattedResults = formatAnalysisData({
                ingredients,
                allergens: allergenResults,
                health: healthAnalysis,
                environmental: environmentalData,
                userProfile
            });

            setProgress(100);
            setIsAnalyzing(false);

            return formattedResults;

        } catch (err) {
            setError(err.message);
            setIsAnalyzing(false);
            throw err;
        }
    }, []);

    const getHealthScore = useCallback((analysis) => {
        if (!analysis || !analysis.health) return 0;

        const weights = {
            nutritionalValue: 0.4,
            safety: 0.3,
            allergens: 0.3
        };

        const scores = {
            nutritionalValue: analysis.health.nutritionalScore || 0,
            safety: analysis.health.safetyScore || 0,
            allergens: analysis.allergens ? (100 - (analysis.allergens.length * 10)) : 100
        };

        return Object.entries(weights).reduce((total, [key, weight]) => {
            return total + (scores[key] * weight);
        }, 0);
    }, []);

    const getEnvironmentalScore = useCallback((analysis) => {
        if (!analysis || !analysis.environmental) return 0;

        const weights = {
            sustainability: 0.4,
            packaging: 0.3,
            carbonFootprint: 0.3
        };

        return Object.entries(weights).reduce((total, [key, weight]) => {
            return total + ((analysis.environmental[key]?.score || 0) * weight);
        }, 0);
    }, []);

    const getRecommendations = useCallback((analysis) => {
        if (!analysis) return [];

        return [
            ...(analysis.health?.recommendations || []),
            ...(analysis.environmental?.recommendations || [])
        ].filter(Boolean).slice(0, 5);
    }, []);

    return {
        analyzeProduct,
        isAnalyzing,
        progress,
        error,
        getHealthScore,
        getEnvironmentalScore,
        getRecommendations
    };
};

export default useAnalysis;