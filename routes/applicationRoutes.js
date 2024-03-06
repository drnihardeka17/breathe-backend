const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Create a new application
router.post('/applications', applicationController.createApplication);

// Get all applications
router.get('/applications', applicationController.getAllApplications);

// Get application by ID
router.get('/applications/:id', applicationController.getApplicationById);

// Update application by ID
router.put('/applications/:id', applicationController.updateApplicationById);

// Delete application by ID
router.delete('/applications/:id', applicationController.deleteApplicationById);

module.exports = router;
