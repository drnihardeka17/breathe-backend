const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
});

module.exports = mongoose.model('Blog', blogSchema);
