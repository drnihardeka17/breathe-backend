const News = require('../models/news');

// Create a new news
exports.createNews = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const news = new News({ title, image, description });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update news by ID
exports.updateNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;
    const news = await News.findByIdAndUpdate(id, { title, image, description }, { new: true });
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete news by ID
exports.deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
