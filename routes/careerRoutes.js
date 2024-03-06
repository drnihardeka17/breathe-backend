const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careersController');

// Create a new career
router.post('/careers', careerController.createCareer);

// Get all careers
router.get('/careers', careerController.getAllCareers);

// Get career by ID
router.get('/careers/:id', careerController.getCareerById);

// Update career by ID
router.put('/careers/:id', careerController.updateCareerById);

// Delete career by ID
router.delete('/careers/:id', careerController.deleteCareerById);

module.exports = router;
