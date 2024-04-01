const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

newsSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);
