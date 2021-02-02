require('./models/db')

const express = require('express')
const Handlebars = require('handlebars')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const employeeController = require('./controllers/employeeController')

var app = express()
app.use(bodyparser.urlencoded({
    extended:false
}))


app.set('views', path.join(__dirname, '/views'))
app.engine('hbs', exphbs({extname:'hbs', defaultLayout:'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars), layoutsDir:__dirname + '/views/layouts'}))
app.set('view engine', 'hbs')

app.listen(3000, () =>{
    console.log('Express server started on port:3000')
})

app.use('/employee', employeeController)