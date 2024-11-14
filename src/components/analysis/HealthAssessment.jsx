import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    ShieldCheck,
    AlertTriangle,
    ThumbsUp,
    ThumbsDown
} from 'lucide-react';

const HealthAssessment = ({ data }) => {
    if (!data) return null;

    const { score, benefits = [], concerns = [], recommendations = [] } = data;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-emerald-500';
        if (score >= 40) return 'text-yellow-500';
        return 'text-red-500';
    };

    const renderList = (items, icon, colorClass) => {
        const Icon = icon;
        return items.map((item, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-3 p-3 rounded-lg ${colorClass}`}
            >
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
            </motion.div>
        ));
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Health Assessment
                </h3>
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}/100
                </div>
            </div>

            <div className="space-y-6">
                {/* Benefits Section */}
                {benefits.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1 text-green-500" />
                            Health Benefits
                        </h4>
                        <div className="space-y-2">
                            {renderList(benefits, ShieldCheck, 'bg-green-50 text-green-700')}
                        </div>
                    </div>
                )}

                {/* Concerns Section */}
                {concerns.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <ThumbsDown className="w-4 h-4 mr-1 text-red-500" />
                            Health Concerns
                        </h4>
                        <div className="space-y-2">
                            {renderList(concerns, AlertTriangle, 'bg-red-50 text-red-700')}
                        </div>
                    </div>
                )}

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Recommendations
                        </h4>
                        <div className="space-y-2">
                            {recommendations.map((rec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm"
                                >
                                    {rec}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Health Score Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg"
                >
                    <div className="text-sm text-gray-600">
                        <p className="font-medium mb-2">Summary</p>
                        <p>
                            {score >= 80 ? 'This product has excellent health attributes.' :
                                score >= 60 ? 'This product has good health attributes with some considerations.' :
                                    score >= 40 ? 'This product has moderate health concerns that should be considered.' :
                                        'This product has significant health concerns that should be carefully evaluated.'}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HealthAssessment;