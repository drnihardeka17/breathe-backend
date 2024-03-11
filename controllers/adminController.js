const Admin = require('../models/admin.js');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }
      const admin = new Admin({ email, password });
      await admin.save();
      req.session.adminId = admin._id; // Log in the newly registered admin automatically
      res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    req.session.adminId = admin._id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout successful' });
    });
  };
  