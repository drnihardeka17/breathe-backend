const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

contactUsSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

module.exports = mongoose.model('ContactUs', contactUsSchema);
