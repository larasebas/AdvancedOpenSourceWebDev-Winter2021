const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser:true}, (err) => {
    if (!err) {
        console.log("Connected to MongoDB database")
    }
    else{
        console.log("Error:" + err)
    }
})

require('./employee.model')