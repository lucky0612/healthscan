import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const SCANNING_STAGES = {
    IDLE: 'idle',
    SCANNING: 'scanning',
    ANALYZING: 'analyzing',
    PROCESSING: 'processing',
    COMPLETE: 'complete',
    ERROR: 'error',
};

export const AppProvider = ({ children }) => {
    const [scanningStage, setScanningStage] = useState(SCANNING_STAGES.IDLE);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [error, setError] = useState(null);
    const [userProfile, setUserProfile] = useState({
        allergies: [],
        dietaryRestrictions: [],
        healthConditions: [],
    });

    const resetState = useCallback(() => {
        setScanningStage(SCANNING_STAGES.IDLE);
        setCurrentProduct(null);
        setAnalysisResults(null);
        setError(null);
    }, []);

    const value = {
        scanningStage,
        currentProduct,
        analysisResults,
        error,
        userProfile,
        resetState,
        setScanningStage,
        setCurrentProduct,
        setAnalysisResults,
        setError,
        setUserProfile,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export default AppProvider;