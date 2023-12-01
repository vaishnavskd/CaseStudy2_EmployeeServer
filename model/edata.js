var mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    position: String,
    location: String,
    salary: Number
});

const EmployeeData = mongoose.model('Employee', EmployeeSchema); 
module.exports = EmployeeData; 
