const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Route to create a new video
router.post('/videos', videoController.createVideo);

// Route to get all videos
router.get('/videos', videoController.getAllVideos);

// Route to get a video by ID
router.get('/videos/:id', videoController.getVideoById);

// Route to update a video by ID
router.put('/videos/:id', videoController.updateVideoById);

// Route to delete a video by ID
router.delete('/videos/:id', videoController.deleteVideoById);

module.exports = router;
