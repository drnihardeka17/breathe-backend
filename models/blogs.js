const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  createdOn: { type: String, default: new Date().toLocaleString() }, // Store as string in readable format
  updatedOn: { type: String, default: new Date().toLocaleString() } // Store as string in readable format
});

blogSchema.pre('save', function(next) {
  const currentDate = new Date().toLocaleString(); // Get current date in readable format
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
