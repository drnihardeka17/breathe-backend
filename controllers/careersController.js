const Career = require('../models/career');

// Create a new career
exports.createCareer = async (req, res) => {
  try {
    const { title, description, qualification, experience, image } = req.body;
    const career = new Career({ title, description, qualification, experience, image });
    await career.save();
    res.status(201).json(career);
  } catch (error) {
    console.error("Error creating career:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all careers
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get career by ID
exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update career by ID
exports.updateCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, qualification, experience, image } = req.body;
    const updatedCareer = { title, description, qualification, experience, image };
    const career = await Career.findByIdAndUpdate(id, updatedCareer, { new: true });
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete career by ID
exports.deleteCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findByIdAndDelete(id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
