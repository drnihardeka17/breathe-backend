const ContactUs = require('../models/contact');
const nodemailer = require('nodemailer');

// Create a new contact message
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Save the contact message to the database
    const contactMessage = new ContactUs({
      name,
      email,
      phone,
      subject,
      message
    });
    await contactMessage.save();

    // Configure nodemailer with your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nagesh.blipper@gmail.com',
        pass: 'mzsdotwpmyygbjsz'
      }
    });

    // Email content
    const mailOptions = {
      from: 'nagesh.blipper@gmail.com',
      to: 'breathediagnostics@gmail.com',
      subject: 'New Contact Message Received',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contact messages
exports.getAllContactMessages = async (req, res) => {
  try {
    const contactMessages = await ContactUs.find();
    res.json(contactMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get contact message by ID
exports.getContactMessageById = async (req, res) => {
  try {
    const contactMessage = await ContactUs.findById(req.params.id);
    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact message by ID
exports.deleteContactMessageById = async (req, res) => {
  try {
    const contactMessage = await ContactUs.findByIdAndDelete(req.params.id);
    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
