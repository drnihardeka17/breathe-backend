const Doctor = require('../models/doctors');
const Department = require('../models/departments');

exports.createDoctor = async (req, res) => {
  try {
    // Extract doctor data from request body
    const { name, photo, departmentName, qualification, speciality, designation, experienceHighlight, description, experience, achievement, researchConferenceSeminar, specialInterest } = req.body;

    // Check if departmentName is provided
    if (!departmentName) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    // Find the department by name
    let department = await Department.findOne({ dname: departmentName });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Create a new doctor instance and link it to the department
    const doctor = new Doctor({
      name,
      photo,
      department: department._id, // Link the doctor to the department using its ID
      qualification,
      speciality,
      designation,
      experienceHighlight,
      description,
      experience,
      achievement,
      researchConferenceSeminar,
      specialInterest
    });

    // Save the doctor to the database
    await doctor.save();

    // Add the doctor to the doctors array of the department
    department.doctors.push(doctor._id);
    await department.save();

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('department');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('department');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
