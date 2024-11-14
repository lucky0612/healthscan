import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, Sparkle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useScanner } from '../../hooks/useScanner';

const Hero = () => {
    const { setScanningStage } = useApp();
    const { handleImageScan } = useScanner();
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setScanningStage('scanning');
                await handleImageScan(file);
            } catch (error) {
                console.error('Error scanning image:', error);
            }
        }
    };

    return (
        <div className="relative pt-20 pb-32">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-emerald-50/40 to-blue-50/40" />
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-1/4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
            />

            {/* Main Content */}
            <div className="relative">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Logo Animation */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.2
                        }}
                        className="mb-8 inline-block"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                <Sparkle className="w-10 h-10 text-green-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Title & Description */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                            Health
                        </span>
                        <span className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text">
                            Scan
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        Empowering conscious consumption through advanced AI analysis.
                        Make informed decisions about your health and environmental impact.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center space-x-2 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5"
                        >
                            <Camera className="w-5 h-5 mr-2" />
                            Upload Image
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-700 rounded-xl flex items-center space-x-2 hover:bg-gray-50 transition-all shadow-lg border border-gray-200">
                            Learn More
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;