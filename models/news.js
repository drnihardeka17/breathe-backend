const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  createdOn: { type: String, default: new Date().toLocaleString() }, // Store as string in readable format
  updatedOn: { type: String, default: new Date().toLocaleString() } // Store as string in readable format
});

newsSchema.pre('save', function(next) {
  const currentDate = new Date().toLocaleString(); // Get current date in readable format
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);
