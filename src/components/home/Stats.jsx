import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Droplets, Wind, Sprout } from 'lucide-react'; // Changed from BarChart3

const Stats = () => {
    const stats = [
        { icon: BarChart2, value: '95%', label: 'Accuracy in Analysis' }, // Changed from BarChart3
        { icon: Droplets, value: '1M+', label: 'Products Scanned' },
        { icon: Wind, value: '80%', label: 'Reduced Decision Time' },
        { icon: Sprout, value: '50%', label: 'More Eco-conscious Choices' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center"
                >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <motion.div
                        className="text-3xl font-bold text-gray-900 mb-2"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 1 + index * 0.1
                        }}
                    >
                        {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Stats;