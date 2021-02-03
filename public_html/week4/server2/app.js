var express = require('express')
var hbs = require('hbs')
const bodyparser = require('body-parser')
//const randomNum = require('../server1 copy/modules/randomNum')

var app = express()

var randomNum = require('./modules/randomNum')

// setup bodyparser
app.use(bodyparser.urlencoded({
    extended:false
}))

// setup handlebars view engine

app.set('view engine', 'hbs')

hbs.registerHelper('ptag', function(num, messageToPassIn){
    var msg = ''

    for(var i = 0; i < Math.round(Math.random()*10); i ++){
        msg += `<p>${messageToPassIn} ${num}</p>`
    }   
    
    return new hbs.handlebars.SafeString(msg)

})

// create the route
app.get('/form', function(req, res){
    res.render('form.hbs')
})

// do a post route
app.post('/results', function(req, res){
    res.render('results.hbs', {
        num:req.body.testNumber
    })
})

// do the connection
app.listen(3000, () =>{
    console.log('Express server started on port:3000')
})