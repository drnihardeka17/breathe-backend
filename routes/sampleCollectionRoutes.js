// routes/sampleCollectionRoutes.js

const express = require("express");
const router = express.Router();
const sampleCollectionController = require("../controllers/sampleCollectionController");

// Create a new sample collection request
router.post("/", sampleCollectionController.createSampleCollectionRequest);

// Get all sample collection requests
router.get("/", sampleCollectionController.getAllSampleCollectionRequests);

// Get a sample collection request by ID
router.get("/:id", sampleCollectionController.getSampleCollectionRequestById);

// Delete a sample collection request by ID
router.delete("/:id", sampleCollectionController.deleteSampleCollectionRequestById);

module.exports = router;
