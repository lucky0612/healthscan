import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X } from 'lucide-react';
import { useScanner } from '../../hooks/useScanner';
import { useApp } from '../../context/AppContext';

const Scanner = () => {
    const { setScanningStage } = useApp();
    const { processImage } = useScanner();
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = async (file) => {
        try {
            if (!file) return;

            // Create preview
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // Process the image
            await processImage(file);

        } catch (error) {
            console.error('Error processing image:', error);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            await handleFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const clearPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setScanningStage('idle');
    };

    return (
        <div className="max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'}
          transition-colors duration-200`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {previewUrl ? (
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-96 mx-auto rounded-lg shadow-lg"
                        />
                        <button
                            onClick={clearPreview}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileSelect(e.target.files[0])}
                        />
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    Drag and drop an image here, or
                                </p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors inline-flex items-center space-x-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>Upload Image</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">
                                Supports JPG, PNG and HEIC images
                            </p>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Scanner;