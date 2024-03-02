// models/SampleCollection.js

const mongoose = require("mongoose");

const sampleCollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  testName: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String }
});

const SampleCollection = mongoose.model("SampleCollection", sampleCollectionSchema);

module.exports = SampleCollection;
