const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

router.get('/', (req,res)=>{
    res.render('employee/addOrEdit', {
        viewTitle : "New Employee"
    })
})

router.post('/', (req,res)=>{
    if (req.body.id == '')
        insertRecord(req, res)
    else
        updateRecord(req,res)
}) 

function insertRecord(req, res){
    var employee = new Employee()
    employee.fullName = req.body.fullName
    employee.department = req.body.department
    employee.startDate = req.body.startDate
    employee.jobTitle = req.body.jobTitle
    employee.phone = req.body.phone
    employee.save((err, doc) =>{
        if(!err){
            res.redirect('employee/list')
        }
        else{
            console.log("Error:" + err)
        }
    })

}

function updateRecord(res, req){
    Employee.findOneAndUpdate ({  id: req.body.id}, req.body, {new:true}, (err,doc) =>{
        if (!err){
            res.redirect('employee/list')
        }
        else{
            console.log("There is an error" + err)
        }
    })
}

router.get('/list', (req,res)=>{
  
    Employee.find((err, docs)=>{
        if (!err){
        res.render("employee/list",{
            list: docs
            })
        }
        else {
            console.log(err)
        }
    })

router.get('/:id', (req,res)=>{
        Employee.findById(req.params.id, (err, doc) =>{
            if (!err){
                res.render("employee/addOrEdit",{
                    viewTitle:"Update Employee",
                    employee: doc
                })
            }
        })
    })

})

router.get('/delete/:id', (req, res) =>{
    Employee.findByIdAndDelete(req.params.id, (err, doc) =>{
        if (!err){
            res.redirect('employee/list')
            }
        else{
            console.log(err)
        }
    })
})

module.exports = router