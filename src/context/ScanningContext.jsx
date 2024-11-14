import React, { createContext, useContext, useState, useCallback } from 'react';
import { useApp } from './AppContext';
import { processImage } from '../services/imageProcessing';
import { analyzeIngredients } from '../services/ingredientAnalysis';
import { getEnvironmentalData } from '../services/environmentalData';

const ScanningContext = createContext();

export const SCANNING_STEPS = {
    CAPTURE: 'capture',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETE: 'complete',
    ERROR: 'error'
};

export const ScanningProvider = ({ children }) => {
    const { setScanningStage, setCurrentProduct, setAnalysisResults, setError } = useApp();
    const [currentStep, setCurrentStep] = useState(SCANNING_STEPS.CAPTURE);
    const [scanProgress, setScanProgress] = useState(0);

    const handleScanError = useCallback((error) => {
        console.error('Scanning error:', error);
        setError(error.message);
        setCurrentStep(SCANNING_STEPS.ERROR);
        setScanningStage('error');
    }, [setError, setScanningStage]);

    const value = {
        currentStep,
        scanProgress,
        setCurrentStep,
        setScanProgress,
        handleScanError
    };

    return (
        <ScanningContext.Provider value={value}>
            {children}
        </ScanningContext.Provider>
    );
};

export const useScanning = () => {
    const context = useContext(ScanningContext);
    if (!context) {
        throw new Error('useScanning must be used within a ScanningProvider');
    }
    return context;
};

export default ScanningProvider;