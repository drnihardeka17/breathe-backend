const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  pdf: { data: Buffer, contentType: String } // Store file as binary data
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

