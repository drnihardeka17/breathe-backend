const Video =('../models/videos');

exports.createVideo = async (req, res) => {
    try {
      const { title, youtubeId } = req.body;
      const video = new Video({ title, youtubeId });
      await video.save();
      res.status(201).json(video);
    } catch (error) {
      console.error("Error creating video:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Controller to get all videos
  exports.getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Controller to get a video by ID
  exports.getVideoById = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Controller to update a video by ID
  exports.updateVideoById = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, youtubeId } = req.body;
      const updatedVideo = { title, youtubeId };
      const video = await Video.findByIdAndUpdate(id, updatedVideo, { new: true });
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Controller to delete a video by ID
  exports.deleteVideoById = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findByIdAndDelete(id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json({ message: 'Video deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  