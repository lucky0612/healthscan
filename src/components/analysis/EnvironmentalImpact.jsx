import React from 'react';
import { motion } from 'framer-motion';
import {
    Leaf,
    Droplets,
    Recycle,
    AlertTriangle,
    CheckCircle,
    XCircle
} from 'lucide-react';

const EnvironmentalImpact = ({ data }) => {
    if (!data) return null;

    const { score, positives = [], concerns = [], recommendations = [] } = data;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-emerald-500';
        if (score >= 40) return 'text-yellow-500';
        return 'text-red-500';
    };

    const renderMetric = (label, value, icon, color) => {
        const Icon = icon;
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
            >
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="text-sm font-medium text-gray-600">{label}</div>
                    <div className="text-lg font-semibold text-gray-900">{value}</div>
                </div>
            </motion.div>
        );
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
                    <Leaf className="w-5 h-5 mr-2 text-green-500" />
                    Environmental Impact
                </h3>
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}/100
                </div>
            </div>

            <div className="space-y-6">
                {/* Environmental Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {renderMetric(
                        'Sustainability',
                        score >= 60 ? 'Good' : 'Needs Improvement',
                        Recycle,
                        score >= 60 ? 'bg-green-500' : 'bg-amber-500'
                    )}
                    {renderMetric(
                        'Water Impact',
                        score >= 70 ? 'Low Impact' : 'Moderate Impact',
                        Droplets,
                        score >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                    )}
                </div>

                {/* Positive Aspects */}
                {positives.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Positive Environmental Aspects
                        </h4>
                        <div className="space-y-2">
                            {renderList(positives, CheckCircle, 'bg-green-50 text-green-700')}
                        </div>
                    </div>
                )}

                {/* Environmental Concerns */}
                {concerns.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Environmental Concerns
                        </h4>
                        <div className="space-y-2">
                            {renderList(concerns, XCircle, 'bg-red-50 text-red-700')}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Environmental Recommendations
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

                {/* Environmental Score Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg"
                >
                    <div className="text-sm text-gray-600">
                        <p className="font-medium mb-2">Environmental Impact Summary</p>
                        <p>
                            {score >= 80 ? 'This product shows excellent environmental responsibility.' :
                                score >= 60 ? 'This product has a moderate environmental impact with some sustainable practices.' :
                                    score >= 40 ? 'This product has significant environmental impacts that could be improved.' :
                                        'This product has major environmental concerns that need addressing.'}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EnvironmentalImpact;