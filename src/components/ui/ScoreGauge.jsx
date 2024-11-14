import React from 'react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score, title, description }) => {
    // Calculate color based on score
    const getColor = (value) => {
        if (value >= 80) return 'text-green-500';
        if (value >= 60) return 'text-emerald-500';
        if (value >= 40) return 'text-yellow-500';
        return 'text-red-500';
    };

    // Calculate background gradient
    const getGradient = (value) => {
        if (value >= 80) return 'from-green-500 to-emerald-500';
        if (value >= 60) return 'from-emerald-500 to-teal-500';
        if (value >= 40) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-rose-500';
    };

    return (
        <div className="p-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>

            <div className="relative w-48 h-48 mx-auto">
                {/* Background Circle */}
                <div className="absolute inset-0 rounded-full bg-gray-100" />

                {/* Score Arc */}
                <svg
                    className="absolute inset-0 transform -rotate-90"
                    viewBox="0 0 100 100"
                >
                    <motion.circle
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={`url(#gradient-${score})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="drop-shadow-lg"
                    />
                    <defs>
                        <linearGradient id={`gradient-${score}`} gradientTransform="rotate(90)">
                            <stop offset="0%" className={`stop-color-${getGradient(score).split(' ')[0]}`} />
                            <stop offset="100%" className={`stop-color-${getGradient(score).split(' ')[1]}`} />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Score Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                        className="text-center"
                    >
                        <span className={`text-4xl font-bold ${getColor(score)}`}>
                            {score}
                        </span>
                        <span className="text-2xl font-semibold text-gray-400">%</span>
                    </motion.div>
                </div>
            </div>

            {/* Score Label */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center mt-4"
            >
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${score >= 60 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {score >= 80 ? 'Excellent' :
                        score >= 60 ? 'Good' :
                            score >= 40 ? 'Fair' : 'Poor'}
                </span>
            </motion.div>
        </div>
    );
};

export default ScoreGauge;