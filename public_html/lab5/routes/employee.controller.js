var Employee = require('./employee.model')
var debug = require('debug')('lab5:review')

function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.emplReadAll = function(req, res){
    debug('Getting all the employees')

    Employee.find().exec().then(function(results){
        sendJSONresponse(res,200,results)
    }).catch(function(err){
        sendJSONresponse(res,404,error)
    })
}

module.exports.emplReadOne = function(req, res){
    
    if(req.params && req.params.id){
        debug('Getting single employee with id =', req.params.id)

        Employee.findById(req.params.id).exec().then(function(results){
        sendJSONresponse(res,200,results)
    
    })
    .catch(function(err){
        sendJSONresponse(res,404,{
            "message":"Employee ID not found"
        })
    })
    }
    else{
        sendJSONresponse(res,404,{
            "message":"Employee ID not found"
        })
    }
    
}

// employee sort by column
module.exports.emplSortByColumn = function(req,res){
    if (!req.params.column){
        sendJSONresponse(res,404,{
            "message": "Please enter a matching column"
        })
        return
    }

    let value = (req.params.order == 'asc') ? 1 : -1,
    col = req.params.column

    Employee.find().sort()({[col]:value}).exec()
    .then((results) => {
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        debug(err)
        sendJSONresponse(res,400,err)
    })
}

// employee search by

module.exports.emplSearchBy = function(req,res){
    let value = req.params.searchValue,
    column = req.params.columnName

    if (!value || !column){
        sendJSONresponse(res,404,{
            "message":"Please supply column"
        })
        return
    }

    Employee.find({[column]:value}).exec().then((results) => {
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        debug(err)
        sendJSONresponse(res,400,err)
    })
}


// post routes /api/v1/employees

module.exports.emplCreate = function(req, res){
    debug("Creating a employee", req.body)

    Employee.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary,
    })
    .then(function(datasaved){
        debug(datasaved)
        sendJSONresponse(res,201,dataSaved)
    })
    .catch(function(err){
        debug(err)
        sendJSONresponse(res,400,err)
    })
}

module.exports.emplUpdateOne = function(req,res){
    if(!req.params.id){
        sendJSONresponse(res,404,{
            "message":"Not found employee ID required"
        })
        return 
    }

    Employee.findById(req.params.id).exec()
    .then(function(reviewData){
        reviewData.firstName = req.body.firstName,
        reviewData.lastName = req.body.lastName,
        reviewData.department = req.body.department,
        reviewData.startDate = req.body.startDate,
        reviewData.jobTitle = req.body.jobTitle,
        reviewData.salary = req.body.salary;

        return reviewData.save();
    })
    .then(function(data){
        sendJSONresponse(res,200,data)
    })
    .catch(function(err){
        sendJSONresponse(res, 400, err)
    })
}

module.exports.emplDeleteOne = function(req,res){
    if(!req.params.id){
        sendJSONresponse(res,404,{
            "message":"Not found employee ID required"
        })
        return 
    }

    Employee.findByIdAndRemove(req.params.id).exec()
        .then(function(data){
            debug("Employee id " + req.params.id + " deleted")
            debug(data)
            sendJSONresponse(res,204,null)
        }).catch(function(err){
            sendJSONresponse(res,404,err)
        })
    
    }

    

