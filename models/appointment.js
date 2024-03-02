const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  doctorSelected: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  appointmentDateTime: Date, // Field for appointment date and time
  receivedOn: { type: Date, default: Date.now },
  comments: String,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

appointmentSchema.plugin(AutoIncrement, {inc_field: 'serialNumber'});

module.exports = mongoose.model('Appointment', appointmentSchema);
