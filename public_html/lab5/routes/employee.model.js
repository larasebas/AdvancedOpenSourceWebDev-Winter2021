var mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    
    department: {
        type: String,
        required: [true,'Department is required']
    },
    
    startDate: {
        type: Date,
        required: [true, 'Date is required']
    },
    
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required']
    }, 

    salary: {
        type: Number,
        required: [true, 'Salary is required']
    },   
    
    createdOn: {
        type: Date,
        "default": Date.now
    }
})

var Employee = mongoose.model('Employees', employeeSchema)

module.exports = Employee