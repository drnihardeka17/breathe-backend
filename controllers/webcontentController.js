const WebsiteContent = require('../models/webcontent');

// Update website content
exports.updateWebsiteContent = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the existing website content or create a new one if it doesn't exist
    let websiteContent = await WebsiteContent.findById(id);
    if (!websiteContent) {
      websiteContent = new WebsiteContent(req.body);
    } else {
      websiteContent.set(req.body);
    }
    // Save the updated website content
    await websiteContent.save();
    res.status(201).json(websiteContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get website content
exports.getWebsiteContent = async (req, res) => {
  try {
    const websiteContent = await WebsiteContent.findOne();
    if (!websiteContent) {
      return res.status(404).json({ message: 'Website content not found' });
    }
    res.json(websiteContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
