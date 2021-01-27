var express = require('express')
var mongoose = require('mongoose')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')

// sets up middleware to use in app
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

// connect to mongoDb database using mongoose
mongoose.connect('mongodb://localhost:27017/favoriteFood',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to database");
}).catch(function(err){
    console.log(err);
})

// load in database templates or schema
require('./models/Food')
// variable reference to model
var Food = mongoose.model('food')

// basic data entry using mongoose
/*var Food = mongoose.model('Food', {nameOfFood:String})

var food = new Food({nameOfFood:"Pizza"});

food.save().then(function(){
    console.log('Food entry was saved')
})
*/


app.post('/saveFoodEntry', function(req, res){
    console.log("Request Made")
    console.log(req.body)

    new Food(req.body).save().then(function(){
        console.log("Data Saved");
        res.redirect('foodList.html')
    })
})

app.get('/getData',function(req,res){
    Food.find({}).then(function(food){
        res.json({food})
    })
})

app.post('/deleteFood', function(req,res){
    console.log("Food deleted: " , req.body._id)
    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect('foodList.html')
})

// sets up static folder
app.use(express.static(__dirname + "/views"))
app.listen(3000, function(){
console.log("Connected to server on port 3000")
})