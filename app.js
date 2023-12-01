// Task1: initiate app and run server at 3000
var express = require('express');
var app = new express();
var mongoose = require('mongoose');
require('dotenv').config();
var PORT = process.env.PORT 
const EmployeeModel = require('./model/edata');

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));

// Task2: create MongoDB connection
var uri = process.env.uri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });




// TODO: get data from db using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await EmployeeModel.find({});
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employee list:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// TODO: get single data from db using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await EmployeeModel.findOne({ _id: id });
        if (!employee) {
            res.status(404).json({ error: "Employee not found" });
        } else {
            res.json(employee);
        }
    } catch (error) {
        console.error("Error fetching employee:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// TODO: send data to db using api '/api/employeelist'
// Request body format: {name:'', location:'', position:'', salary:''}
app.post('/api/employeelist', async (req, res) => {
    const { name, location, position, salary } = req.body;
    try {
        const newEmployee = await EmployeeModel.create({
            name: name,
            location: location,
            position: position,
            salary: salary
        });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error("Error creating employee:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// TODO: delete an employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEmployee = await EmployeeModel.findOneAndDelete({ _id: id });
        if (!deletedEmployee) {
            res.status(404).json({ error: "Employee not found" });
        } else {
            res.json(deletedEmployee);
        }
    } catch (error) {
        console.error("Error deleting employee:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// TODO: Update an employee data from db by using api '/api/employeelist'
// Request body format: {name:'', location:'', position:'', salary:''}
app.put('/api/employeelist', async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;
        const updateObject = {};
        if (name) updateObject.name = name;
        if (location) updateObject.location = location;
        if (position) updateObject.position = position;
        if (salary) updateObject.salary = salary;

        const updatedEmployee = await EmployeeModel.findOneAndUpdate({}, { $set: updateObject }, { new: true });

        if (!updatedEmployee) {
            res.status(404).json({ error: "No employee found to update" });
        } else {
            res.json(updatedEmployee);
        }
    } catch (error) {
        console.error("Error updating employee:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// Don't delete this code. It connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
