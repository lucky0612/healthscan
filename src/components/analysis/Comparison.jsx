import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react'; // Changed from ChartBar to BarChart2

const Comparison = ({ title, description, metrics }) => {
    const getComparisonDetails = (value, benchmark) => {
        const difference = value - benchmark;
        const percentDifference = ((difference / benchmark) * 100).toFixed(1);

        return {
            icon: difference >= 0 ? TrendingUp : TrendingDown,
            color: difference >= 0 ? 'text-green-500' : 'text-red-500',
            text: `${Math.abs(percentDifference)}% ${difference >= 0 ? 'above' : 'below'} average`
        };
    };

    return (
        <div className="p-6">
            <div className="flex items-center space-x-2 mb-2">
                <BarChart2 className="w-5 h-5 text-gray-500" /> {/* Changed from ChartBar to BarChart2 */}
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>

            <p className="text-sm text-gray-600 mb-6">{description}</p>

            <div className="space-y-6">
                {metrics.map((metric, index) => {
                    const comparison = getComparisonDetails(metric.value, metric.benchmark);
                    const ComparisonIcon = comparison.icon;

                    return (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>{metric.label}</span>
                                <span className="flex items-center space-x-1">
                                    <ComparisonIcon className={`w-4 h-4 ${comparison.color}`} />
                                    <span className={comparison.color}>{comparison.text}</span>
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-100 text-gray-600">
                                            Score
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-gray-600">
                                            {metric.value}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.value}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-emerald-600"
                                    />
                                </div>
                                {/* Benchmark Indicator */}
                                <div
                                    className="absolute top-full mt-1 w-0.5 h-2 bg-gray-400"
                                    style={{ left: `${metric.benchmark}%` }}
                                >
                                    <div className="text-xs text-gray-500 mt-2 transform -translate-x-1/2">
                                        Avg
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Summary Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-gray-50 rounded-lg"
            >
                <p className="text-sm text-gray-600">
                    {metrics.every(m => m.value >= m.benchmark)
                        ? "This product performs above industry standards across all metrics."
                        : metrics.every(m => m.value < m.benchmark)
                            ? "This product has room for improvement compared to industry standards."
                            : "This product shows mixed performance compared to industry standards."}
                </p>
            </motion.div>
        </div>
    );
};

export default Comparison;