const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true }, // Assuming the photo is stored as a URL
  address: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
