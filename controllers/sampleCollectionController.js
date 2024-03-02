const SampleCollection = require("../models/samplecollection");

exports.createSampleCollectionRequest = async (req, res) => {
  try {
    const newSampleCollection = await SampleCollection.create(req.body);
    res.status(201).json(newSampleCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSampleCollectionRequests = async (req, res) => {
  try {
    const sampleCollectionRequests = await SampleCollection.find();
    res.status(200).json(sampleCollectionRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSampleCollectionRequestById = async (req, res) => {
  try {
    const sampleCollectionRequest = await SampleCollection.findById(req.params.id);
    if (!sampleCollectionRequest) {
      return res.status(404).json({ message: "Sample collection request not found" });
    }
    res.status(200).json(sampleCollectionRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSampleCollectionRequestById = async (req, res) => {
  try {
    const deletedSampleCollectionRequest = await SampleCollection.findByIdAndDelete(req.params.id);
    if (!deletedSampleCollectionRequest) {
      return res.status(404).json({ message: "Sample collection request not found" });
    }
    res.status(200).json({ message: "Sample collection request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
