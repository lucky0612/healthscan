import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const analyzeIngredients = async (ingredients) => {
    try {
        const prompt = {
            contents: [{
                parts: [{
                    text: `Analyze these product ingredients for health and environmental impact:
${ingredients.join(', ')}

Please provide an analysis with these specific aspects:

1. Health Analysis:
- Overall health score (0-100)
- List of potential allergens
- Health benefits
- Health concerns
- Recommendations

2. Environmental Impact:
- Environmental score (0-100)
- Positive environmental aspects
- Environmental concerns
- Sustainability recommendations

Format the response in this exact JSON structure:
{
  "health": {
    "score": number,
    "allergens": string[],
    "benefits": string[],
    "concerns": string[],
    "recommendations": string[]
  },
  "environmental": {
    "score": number,
    "positives": string[],
    "concerns": string[],
    "recommendations": string[]
  }
}`
                }]
            }]
        };

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            prompt,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const result = response.data.candidates[0].content.parts[0].text;

        // Extract JSON from the response
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid response format');
        }

        const analysisResults = JSON.parse(jsonMatch[0]);

        // Validate the response structure
        if (!analysisResults.health || !analysisResults.environmental) {
            throw new Error('Invalid analysis results structure');
        }

        // Add metadata
        return {
            ...analysisResults,
            timestamp: new Date().toISOString(),
            ingredientsAnalyzed: ingredients.length
        };

    } catch (error) {
        console.error('Error analyzing ingredients:', error);

        // Return a default structure with error indication
        return {
            health: {
                score: 0,
                allergens: [],
                benefits: ['Analysis unavailable'],
                concerns: ['Could not analyze ingredients'],
                recommendations: ['Please try again or check ingredient list manually']
            },
            environmental: {
                score: 0,
                positives: [],
                concerns: ['Analysis unavailable'],
                recommendations: ['Please try again']
            },
            error: true,
            message: 'Failed to analyze ingredients',
            timestamp: new Date().toISOString(),
            ingredientsAnalyzed: ingredients.length
        };
    }
};

export const categorizeIngredients = (ingredients = [], analysis = null) => {
    if (!ingredients || !analysis) return {
        safe: [],
        concerning: [],
        allergens: [],
        eco_friendly: [],
        eco_concerning: []
    };

    const categories = {
        safe: [],
        concerning: [],
        allergens: analysis.health?.allergens || [],
        eco_friendly: [],
        eco_concerning: []
    };

    ingredients.forEach(ingredient => {
        const normalizedIngredient = ingredient.toLowerCase();

        // Categorize based on health analysis
        if (analysis.health?.concerns?.some(concern =>
            concern.toLowerCase().includes(normalizedIngredient)
        )) {
            categories.concerning.push(ingredient);
        } else {
            categories.safe.push(ingredient);
        }

        // Categorize based on environmental analysis
        if (analysis.environmental?.positives?.some(positive =>
            positive.toLowerCase().includes(normalizedIngredient)
        )) {
            categories.eco_friendly.push(ingredient);
        } else if (analysis.environmental?.concerns?.some(concern =>
            concern.toLowerCase().includes(normalizedIngredient)
        )) {
            categories.eco_concerning.push(ingredient);
        }
    });

    return categories;
};

export default {
    analyzeIngredients,
    categorizeIngredients
};