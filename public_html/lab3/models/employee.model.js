

const mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    fullName:{type:String, required:"This is required"},
    department:{type:String},
    startDate:{type:String},
    jobTitle:{type:String},
    phone:{type:String}
})




mongoose.model('Employee', employeeSchema)