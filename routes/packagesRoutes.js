const express = require('express');
const router = express.Router();
const packagesController = require('../controllers/packagesController');

// Route to handle file upload and conversion to HTML
router.post('/upload', packagesController.uploadDocFile);
router.get('/', packagesController.getAllDocContents);
// Routes for edit, delete, and get by ID
router.put('/:id', packagesController.editDocContent);
router.delete('/:id', packagesController.deleteDocContent);
router.get('/:id', packagesController.getDocContentById);

module.exports = router;
