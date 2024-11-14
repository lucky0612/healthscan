import { createWorker } from 'tesseract.js';

// Helper function to preprocess image
const preprocessImage = async (imageFile) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas for image processing
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas size to image size
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw original image
                ctx.drawImage(img, 0, 0);

                // Get image data for processing
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Apply image processing
                for (let i = 0; i < data.length; i += 4) {
                    // Convert to grayscale
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;     // Red
                    data[i + 1] = avg; // Green
                    data[i + 2] = avg; // Blue

                    // Increase contrast
                    const contrast = 1.2;
                    data[i] = ((data[i] - 128) * contrast) + 128;
                    data[i + 1] = ((data[i + 1] - 128) * contrast) + 128;
                    data[i + 2] = ((data[i + 2] - 128) * contrast) + 128;
                }

                // Put processed image back on canvas
                ctx.putImageData(imageData, 0, 0);

                // Convert canvas to blob
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', 0.95);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    });
};

// Helper function to extract ingredients from text
const extractIngredients = (text) => {
    // Look for common ingredient section indicators
    const patterns = [
        /ingredients:([^.]*)/i,
        /contains:([^.]*)/i,
        /ingredients list:([^.]*)/i
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            // Split ingredients by common separators
            return match[1]
                .split(/[,;]/)
                .map(ingredient => ingredient.trim())
                .filter(ingredient =>
                    ingredient &&
                    ingredient.length > 1 &&
                    !/^\d+$/.test(ingredient)
                );
        }
    }

    // If no clear ingredients section is found, try to identify ingredient-like text
    const lines = text.split('\n');
    const potentialIngredients = lines
        .filter(line =>
            line.length > 2 &&
            line.length < 50 &&
            !/^\d+$/.test(line) &&
            !/^[A-Za-z]:\s*\d/.test(line) // Exclude nutrition facts
        )
        .map(line => line.trim());

    return potentialIngredients;
};

export const processImage = async (imageFile, onProgress = () => { }) => {
    try {
        // Initialize Tesseract worker
        const worker = await createWorker();
        onProgress(0.2);

        // Preprocess image
        const processedImage = await preprocessImage(imageFile);
        onProgress(0.4);

        // Perform OCR
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        onProgress(0.6);

        const { data: { text } } = await worker.recognize(processedImage);
        onProgress(0.8);

        // Terminate worker
        await worker.terminate();

        // Extract and clean ingredients
        const ingredients = extractIngredients(text);
        onProgress(1);

        return {
            text,
            ingredients
        };

    } catch (error) {
        console.error('Error processing image:', error);
        throw new Error('Failed to process image. Please try again.');
    }
};

export const optimizeImage = async (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // Create canvas and resize
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to blob
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

export default {
    processImage,
    optimizeImage
};