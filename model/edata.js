var mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    employeeName: String,
    employeePos: String,
    officeLocation: String,
    employeeSalary: Number
});

const EmployeeData = mongoose.model('Employee', EmployeeSchema); 
module.exports = EmployeeData; 
