const Gallery = require('../models/gallery');

// Create a new gallery
exports.createGallery = async (req, res) => {
  try {
    const { title, images } = req.body;
    const gallery = new Gallery({ title, images });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all galleries
exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get gallery by ID
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update gallery by ID
exports.updateGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, images } = req.body;
    const gallery = await Gallery.findByIdAndUpdate(id, { title, images }, { new: true });
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete gallery by ID
exports.deleteGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
