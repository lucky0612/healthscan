import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Search, Database, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ScanningProgress = () => {
    const { scanningStage } = useApp();

    const stages = [
        {
            id: 'scanning',
            label: 'Scanning Product',
            description: 'Reading and processing image...',
            icon: Search
        },
        {
            id: 'analyzing',
            label: 'Analyzing Ingredients',
            description: 'Identifying components and potential allergens...',
            icon: Database
        },
        {
            id: 'processing',
            label: 'Processing Results',
            description: 'Generating health and environmental insights...',
            icon: Loader2
        }
    ];

    const getCurrentStageIndex = () => {
        return stages.findIndex(stage => stage.id === scanningStage);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Progress Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Analyzing Your Product
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we process your product information
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="relative">
                    {stages.map((stage, index) => {
                        const isActive = index <= getCurrentStageIndex();
                        const isCurrent = stage.id === scanningStage;

                        return (
                            <div key={stage.id} className="relative">
                                <div className="flex items-center mb-8">
                                    {/* Step Connector */}
                                    {index > 0 && (
                                        <div className="absolute left-0 -ml-px mt-0.5 top-0 h-full w-0.5 flex items-center">
                                            <div className={`h-full w-0.5 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`} />
                                        </div>
                                    )}

                                    {/* Step Circle */}
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: isActive ? 1 : 0.8 }}
                                        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full 
                      ${isActive ? 'bg-green-500' : 'bg-gray-200'} 
                      transition-colors duration-200`}
                                    >
                                        {isCurrent ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                <stage.icon className="w-6 h-6 text-white" />
                                            </motion.div>
                                        ) : (
                                            <stage.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                        )}
                                    </motion.div>

                                    {/* Step Content */}
                                    <div className="ml-4 flex-1">
                                        <h3 className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {stage.label}
                                        </h3>
                                        <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {stage.description}
                                        </p>
                                    </div>

                                    {/* Step Status */}
                                    {isActive && !isCurrent && (
                                        <div className="ml-4">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                                            >
                                                <ChevronRight className="w-5 h-5 text-green-600" />
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Indicator */}
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${((getCurrentStageIndex() + 1) / stages.length) * 100}%` }}
                    className="h-2 bg-green-500 rounded-full"
                    transition={{ duration: 0.5 }}
                />
            </motion.div>
        </div>
    );
};

export default ScanningProgress;