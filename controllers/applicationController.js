const Application = require('../models/application');

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, description, pdf } = req.body;

    const application = new Application({ firstName, lastName, email, phone, description, pdf });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application by ID
exports.updateApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, description, pdf } = req.body;
    const updatedApplication = { firstName, lastName, email, phone, description, pdf };
    const application = await Application.findByIdAndUpdate(id, updatedApplication, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete application by ID
exports.deleteApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
