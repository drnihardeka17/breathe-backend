const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Department routes
router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.put('/:id', departmentController.updateDepartmentById);
router.delete('/:id', departmentController.deleteDepartmentById);

module.exports = router;
