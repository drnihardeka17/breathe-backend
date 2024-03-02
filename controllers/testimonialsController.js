const Testimonial = require('../models/testimonials');

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { name, photo, address, content } = req.body;
    const testimonial = new Testimonial({ name, photo, address, content });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a testimonial by ID
exports.updateTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, photo, address, content } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, { name, photo, address, content }, { new: true });
    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

