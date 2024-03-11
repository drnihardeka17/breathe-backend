const mongoose = require('mongoose');

const healthpackages = new mongoose.Schema({
    title: String,
    content: String,
});

const PacContent = mongoose.model('DocContent', healthpackages);

module.exports = PacContent;
