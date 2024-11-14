import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Leaf,
  Camera,
  Shield,
  Activity,
  ArrowRight,
  AlertTriangle,
  Sparkle, // Changed from Sparkles
  BarChart2, // Changed from BarChart3
  Droplets,
  Wind,
  Sprout
} from 'lucide-react';
import { useApp } from './context/AppContext';
import { useScanning } from './context/ScanningContext';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import Stats from './components/home/Stats';
import Scanner from './components/scanning/Scanner';
import ScanningProgress from './components/scanning/ScanningProgress';
import ResultsView from './components/scanning/ResultsView';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

const App = () => {
  const {
    scanningStage,
    currentProduct,
    analysisResults,
    error,
    resetState
  } = useApp();

  const { currentStep } = useScanning();

  // Interactive background animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderContent = () => {
    switch (scanningStage) {
      case 'idle':
        return (
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />
            <Features />
            <Stats />
            <div className="mt-32 text-center">
              <h4 className="text-gray-600 mb-8">
                Trusted by leading brands and organizations
              </h4>
              <div className="flex justify-center items-center space-x-12 opacity-50">
                {/* Partner logos placeholder */}
              </div>
            </div>
          </div>
        );

      case 'scanning':
      case 'analyzing':
      case 'processing':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-8">
              <ScanningProgress currentStep={currentStep} />
            </div>
          </div>
        );

      case 'complete':
        return <ResultsView />;

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-red-100 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">
                  Analysis Error
                </h2>
                <p className="text-red-600 mb-6">{error}</p>
                <button
                  onClick={resetState}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
                >
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),rgba(255,255,255,0))]"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-grow pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={scanningStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;