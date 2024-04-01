const mongoose = require("mongoose");

const sampleCollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  testName: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

sampleCollectionSchema.pre('save', function(next) {
  const currentDate = new Date();
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

const SampleCollection = mongoose.model("SampleCollection", sampleCollectionSchema);

module.exports = SampleCollection;
