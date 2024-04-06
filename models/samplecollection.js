const mongoose = require("mongoose");

const sampleCollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  testName: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  createdOn: { type: String, default: new Date().toLocaleString() }, // Store as string in readable format
  updatedOn: { type: String, default: new Date().toLocaleString() } // Store as string in readable format
});

sampleCollectionSchema.pre('save', function(next) {
  const currentDate = new Date().toLocaleString(); // Get current date in readable format
  this.updatedOn = currentDate;
  if (!this.createdOn) {
    this.createdOn = currentDate;
  }
  next();
});

const SampleCollection = mongoose.model("SampleCollection", sampleCollectionSchema);

module.exports = SampleCollection;
