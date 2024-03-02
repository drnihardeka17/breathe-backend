const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactController');

// Contact Us routes
router.post('/', contactUsController.createContactMessage);
router.get('/', contactUsController.getAllContactMessages);
router.get('/:id', contactUsController.getContactMessageById);
router.delete('/:id', contactUsController.deleteContactMessageById);

module.exports = router;
