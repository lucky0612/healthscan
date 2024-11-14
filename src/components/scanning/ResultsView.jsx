import React from 'react';
import { motion } from 'framer-motion';
import {
    Leaf,
    Shield,
    Activity,
    ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ScoreGauge from '../ui/ScoreGauge';
import InfoCard from '../ui/InfoCard';
import AllergenAlert from '../analysis/AllergenAlert';
import IngredientAnalysis from '../analysis/IngredientAnalysis';
import HealthAssessment from '../analysis/HealthAssessment';
import EnvironmentalImpact from '../analysis/EnvironmentalImpact';
import Comparison from '../analysis/Comparison';

const ResultsView = () => {
    const { analysisResults, currentProduct, resetState } = useApp();

    if (!analysisResults || !currentProduct) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500">
                No analysis results available
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Results Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-center"
            >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                    Analysis Complete
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Product Analysis Results</h2>
            </motion.div>

            {/* Analysis Results Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Main Analysis */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    {analysisResults?.health?.allergens?.length > 0 && (
                        <AllergenAlert allergens={analysisResults.health.allergens} />
                    )}

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <IngredientAnalysis
                            ingredients={currentProduct.ingredients || []}
                            analysis={analysisResults}
                        />
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <ScoreGauge
                            score={analysisResults?.health?.score || 0}
                            title="Overall Health Score"
                            description="Combined score based on nutritional value and safety"
                        />
                    </div>
                </motion.div>

                {/* Right Column - Detailed Analysis */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <HealthAssessment data={analysisResults?.health} />
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <EnvironmentalImpact data={analysisResults?.environmental} />
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <Comparison
                            title="Industry Comparison"
                            description="How this product compares to similar products"
                            metrics={[
                                {
                                    label: 'Health Impact',
                                    value: analysisResults?.health?.score || 0,
                                    benchmark: 75,
                                    type: 'percentage'
                                },
                                {
                                    label: 'Environmental Impact',
                                    value: analysisResults?.environmental?.score || 0,
                                    benchmark: 70,
                                    type: 'percentage'
                                }
                            ]}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Recommendations Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    Detailed Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        title="Health Insights"
                        icon={Activity}
                        items={analysisResults?.health?.recommendations || []}
                        variant="success"
                    />
                    <InfoCard
                        title="Environmental Impact"
                        icon={Leaf}
                        items={analysisResults?.environmental?.recommendations || []}
                        variant="info"
                    />
                    <InfoCard
                        title="Safety Considerations"
                        icon={Shield}
                        items={analysisResults?.health?.concerns || []}
                        variant="warning"
                    />
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex justify-center space-x-4"
            >
                <button
                    onClick={resetState}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
                >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Scan Another Product
                </button>
            </motion.div>
        </div>
    );
};

export default ResultsView;