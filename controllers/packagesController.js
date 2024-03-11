const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mammoth = require('mammoth');
const PacContent = require('../models/healthpackages');

// Utility function to extract images from HTML content
const extractImagesFromHtml = (htmlContent) => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const images = [];
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
        images.push(match[1]);
    }
    return images;
};

// Controller function to handle file upload and conversion to HTML
exports.uploadDocFile = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const docFile = req.files.file;

        // Use mammoth to convert Doc file to HTML
        const result = await mammoth.convertToHtml({ buffer: docFile.data });

        // Extract images from HTML content
        const images = extractImagesFromHtml(result.value);

        // Store images
        const imageUrls = [];
        const writeFileAsync = promisify(fs.writeFile);
        const imageDirectory = path.join(__dirname, '..', 'public', 'images');

        // Ensure image directory exists
        if (!fs.existsSync(imageDirectory)) {
            fs.mkdirSync(imageDirectory, { recursive: true });
        }

        for (const imageUrl of images) {
            const imageName = path.basename(imageUrl);
            const imageFilePath = path.join(imageDirectory, imageName);
            await writeFileAsync(imageFilePath, imageUrl, 'base64');
            imageUrls.push(`/images/${imageName}`);
        }

        // Create a new PacContent document and save it to MongoDB
        const newDocContent = new PacContent({
            title: req.body.title || 'Untitled', // Set a default title if not provided
            content: result.value,
            images: imageUrls,
        });

        await newDocContent.save();

        res.status(201).json({ message: 'Doc file uploaded and converted to HTML successfully' });
    } catch (error) {
        console.error('Error uploading Doc file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to handle editing Doc content
exports.editDocContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedDocContent = await PacContent.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updatedDocContent) {
            return res.status(404).json({ message: 'Doc content not found' });
        }

        res.json(updatedDocContent);
    } catch (error) {
        console.error('Error editing Doc content:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to handle deleting Doc content
exports.deleteDocContent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDocContent = await PacContent.findByIdAndDelete(id);

        if (!deletedDocContent) {
            return res.status(404).json({ message: 'Doc content not found' });
        }

        res.json({ message: 'Doc content deleted successfully' });
    } catch (error) {
        console.error('Error deleting Doc content:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to handle getting Doc content by ID
exports.getDocContentById = async (req, res) => {
    try {
        const { id } = req.params;

        const docContent = await PacContent.findById(id);

        if (!docContent) {
            return res.status(404).json({ message: 'Doc content not found' });
        }

        res.json(docContent);
    } catch (error) {
        console.error('Error getting Doc content by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get all documents
exports.getAllDocContents = async (req, res) => {
    try {
        // Fetch all documents from the database
        const docContents = await PacContent.find();

        // Check if documents exist
        if (!docContents || docContents.length === 0) {
            return res.status(404).json({ message: 'No documents found' });
        }

        // Return the documents in the response
        res.json(docContents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


