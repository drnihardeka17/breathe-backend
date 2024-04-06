const Department = require('../models/departments');

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { dname, description, image } = req.body;
    const department = new Department({
      dname,
      description,
      image
    });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('doctors');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate('doctors');
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update department by ID
exports.updateDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { dname, description, image } = req.body;
    const department = await Department.findByIdAndUpdate(id, {
      dname,
      description,
      image
    }, { new: true });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete department by ID
exports.deleteDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
