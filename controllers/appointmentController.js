const Appointment = require('../models/appointment');
const Doctor = require('../models/doctors');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, phone, doctorSelected, appointmentDateTime } = req.body;

    // Check if the selected doctor exists
    const doctor = await Doctor.findById(doctorSelected);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Create the appointment with the selected doctor
    const appointment = new Appointment({
      name,
      phone,
      doctorSelected: doctor._id,
      appointmentDateTime: new Date(appointmentDateTime), // Convert string to Date object
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorSelected');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('doctorSelected');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment status and action
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusChange, comments } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (statusChange) {
      appointment.status = statusChange;
    }

    if (statusChange === 'completed' && comments) {
      appointment.action = {
        statusChange,
        comments
      };
    }

    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

