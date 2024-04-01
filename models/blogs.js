const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

blogSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
