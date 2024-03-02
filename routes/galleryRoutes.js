const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Create a new gallery
router.post('/', galleryController.createGallery);

// Get all galleries
router.get('/', galleryController.getAllGalleries);

// Get gallery by ID
router.get('/:id', galleryController.getGalleryById);

// Update gallery by ID
router.put('/:id', galleryController.updateGalleryById);

// Delete gallery by ID
router.delete('/:id', galleryController.deleteGalleryById);

module.exports = router;
