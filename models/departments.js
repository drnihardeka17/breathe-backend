const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  dname: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
});

module.exports = mongoose.model('Department', DepartmentSchema);

