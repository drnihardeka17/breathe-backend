const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  photo: String, // Assuming the photo is stored as a URL
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  qualification: String,
  speciality: String,
  designation: String,
  experienceHighlight: String,
  description: String,
  experience: String,
  achievement: String,
  researchConferenceSeminar: String,
  specialInterest: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
