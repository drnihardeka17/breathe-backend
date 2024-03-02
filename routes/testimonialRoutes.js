const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialsController');

// Testimonial routes
router.post('/', testimonialController.createTestimonial);
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.put('/:id', testimonialController.updateTestimonialById);
router.delete('/:id', testimonialController.deleteTestimonialById);

module.exports = router;
