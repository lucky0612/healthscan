import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Activity } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: Leaf,
            title: "Environmental Impact",
            description: "Real-time analysis of product sustainability and eco-impact",
            gradient: "from-green-400 to-emerald-500",
            delay: 0.2
        },
        {
            icon: Shield,
            title: "Health Analysis",
            description: "Advanced AI-powered ingredient safety assessment",
            gradient: "from-blue-400 to-cyan-500",
            delay: 0.4
        },
        {
            icon: Activity,
            title: "Personalized Insights",
            description: "Tailored recommendations based on your health profile",
            gradient: "from-purple-400 to-indigo-500",
            delay: 0.6
        }
    ];

    return (
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.delay }}
                    className="relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all" />
                    <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                            <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600">
                            {feature.description}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Features;