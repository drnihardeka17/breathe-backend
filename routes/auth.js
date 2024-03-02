const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.js');
const  JWT_SECRET  = "breathe2024";

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
    const isValidPassword = await admin.isValidPassword(password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
