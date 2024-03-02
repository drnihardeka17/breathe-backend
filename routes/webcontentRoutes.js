const express = require('express');
const router = express.Router();
const websiteContentController = require('../controllers/webcontentController');

// Update website content
router.post('/website-content/:id', websiteContentController.updateWebsiteContent);

// Get website content
router.get('/website-content', websiteContentController.getWebsiteContent);

module.exports = router;
