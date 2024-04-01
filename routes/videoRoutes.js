const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Route to create a new video
router.post('/', videoController.createVideo);

// Route to get all videos
router.get('/', videoController.getAllVideos);

// Route to get a video by ID
router.get('/:id', videoController.getVideoById);

// Route to update a video by ID
router.put('/:id', videoController.updateVideoById);

// Route to delete a video by ID
router.delete('/:id', videoController.deleteVideoById);

module.exports = router;
