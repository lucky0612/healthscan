import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useScanning } from '../context/ScanningContext';
import { processImage } from '../services/imageProcessing';
import { analyzeIngredients } from '../services/ingredientAnalysis';
import { getEnvironmentalData } from '../services/environmentalData';
import { getMockAnalysis } from '../services/mockAnalysis';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const useScanner = () => {
    const {
        setScanningStage,
        setCurrentProduct,
        setAnalysisResults,
        setError
    } = useApp();

    const {
        setCurrentStep,
        setScanProgress
    } = useScanning();

    const handleImageScan = useCallback(async (imageFile) => {
        try {
            // Start scanning process
            setScanningStage('scanning');
            setScanProgress(0);

            // Process image
            const { text, ingredients } = await processImage(imageFile, (progress) => {
                setScanProgress(progress * 30);
            });

            // For testing: use mock ingredients if none detected
            const detectedIngredients = ingredients.length > 0 ? ingredients : [
                'water', 'sugar', 'wheat flour', 'soy lecithin', 'natural flavors',
                'sodium bicarbonate', 'artificial colors'
            ];

            // Set current product
            setCurrentProduct({
                rawText: text,
                ingredients: detectedIngredients,
                imageUrl: URL.createObjectURL(imageFile)
            });

            // Start analysis
            setScanningStage('analyzing');
            setScanProgress(40);

            let analysisResult;
            if (USE_MOCK_DATA) {
                // Use mock data for testing
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
                analysisResult = getMockAnalysis(detectedIngredients);
            } else {
                // Real analysis
                analysisResult = await analyzeIngredients(detectedIngredients);
            }

            setScanProgress(70);

            // Get environmental data
            let environmentalData;
            if (USE_MOCK_DATA) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
                environmentalData = analysisResult.environmental;
            } else {
                environmentalData = await getEnvironmentalData(detectedIngredients);
            }

            setScanProgress(90);

            // Set final results
            setAnalysisResults({
                ...analysisResult,
                environmental: environmentalData,
                timestamp: new Date().toISOString()
            });

            // Complete the process
            setScanningStage('complete');
            setScanProgress(100);

        } catch (error) {
            console.error('Error scanning image:', error);
            setError(error.message || 'Failed to process image');
            setScanningStage('error');
        }
    }, [
        setScanningStage,
        setCurrentProduct,
        setAnalysisResults,
        setError,
        setScanProgress
    ]);

    return {
        handleImageScan
    };
};

export default useScanner;