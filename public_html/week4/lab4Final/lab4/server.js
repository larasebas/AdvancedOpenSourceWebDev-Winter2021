var express = require('express');
var hbs = require('hbs');
var app = express();
app.set('view engine', 'hbs'); // hbs as view engine

hbs.registerPartials(__dirname + '/views/partials'); //some extra...

// I had issues in the past
app.use(express.urlencoded({extended:false}));

// To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(__dirname + '/public'));

//app.use(app.router);
// redirect if nothing else sent a response
//app.use(redirectUnmatched)

// function redirectUnmatched(req, res) {
//   res.redirect('/error');
// }

// app.all('*', function(req, res) {
//   res.redirect("./error");
// });


// form get request
app.get('/form',(req,res)=>{
    res.render('form.hbs');
}) 

// variable to have the color generated
function generateColor() {
    var color = ((1<<24)*Math.random()|0).toString(16);
    return color;
}

// this is when we create the helper script to generate the grid with the random colors
hbs.registerHelper('generateGrid', (numberFromForm)=>{
    var table = "<table>";

        // first loop to generate number of table rows
        for(var i = 0; i < numberFromForm; i++){
            table +=`<tr>`;

            // second loop to display data inside every square
            for(var j = 0; j < numberFromForm; j++){
                var randomColor = generateColor();
                table += `<td style='background-color:#${randomColor};'><span style='color:#000000;'>${randomColor}</span></td>`;
            }
            table += `</tr>`;
        }
        table += "</table>";
    return table;
})

app.post('/grid',(req,res)=>{
    res.render('grid.hbs', {
        dropDownOption:Number(req.body.ddlNumber)
    })
})

app.use('/error',(req,res,next)=>{
    res.render('error.hbs', {
        num:between(20,50)
    });
    next; 
});

// generates a random number passing parms
function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

hbs.registerHelper('error404', (number)=>{
       
    var error = "";
        for(var i = 0; i < number; i ++){
         
                var classes = ["still", "rotate","shrink"];
                var randomNum = between(0,3);
                error += `<div class='${classes[randomNum]}'>404</div>`;
    
        }

    return error;

});

// generates a list of ddl 3-20
function generateDropDownList() {
    
  var numbers = [3,4,5,10,20];
    
    var generateOptions = "";
    
    for(let i = 0; i < numbers.length; i++) {
        generateOptions += "<option>" + numbers[i] + "</option>";
    }
    return generateOptions;
}


hbs.registerHelper('ddlOptions', generateDropDownList());

app.listen(3000, () => {
    console.log('server connected on Port 3000');
});