const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
