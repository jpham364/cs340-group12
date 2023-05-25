/*
    SETUP
*/


// Most of the app.js implementation is from the ecampus resource to use a node.js starter app
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Step 0: set up Node.js / Express
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 5647;                 // Set a port number at the top so it's easy to change in the future





// Step 1: Connecting to SQL database
// Database
var db = require('./db-connector');


// Step 3: Integrating Handlebars
const { engine } = require('express-handlebars');
var expressHBS = require('express-handlebars'); // importing expressHBS
app.engine('.hbs', engine({extname: ".hbs"})); // Create HBS engine to process template
app.set('view engine', '.hbs') // use HBS when it sees a .hbs file



// This allows access to public, static directories for now
// Make public directory (CSS, etc,.) available to client (user's browser)
app.use(express.static('public'));


// Step 5: Adding New Data SETUP
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))



/*
    ROUTES
*/
app.get('/', function(req, res){

    res.render('partials/index');

});

app.get('/users', function(req, res){

    let query1 = "SELECT * FROM Users;";

    let query2 = "SELECT userID FROM Users;";

    db.pool.query(query1, function(error, rows, fields){
         
        // {data: rows}
        // This sends the renderer an object
        // where 'data' is equal to 'rows' we 
        // got from the query
        // res.render('partials/users', {data: rows});
        let users = rows;

        // res.render('partials/users',{data: users});
        db.pool.query(query2, (error, rows, fields) => {

            // Save user IDs
            let userIDs = rows;
            return res.render('partials/users', {data: users, users: userIDs});
        })



    })

});


// Step 5 Adding New Data
app.post('/add-user-form', function(req, res){


    // Capture incoming data and parse into JS object
    let data = req.body;

    // Capture NULL values (if applicable)


    // Create query and run it on database
    insertUser = `INSERT INTO Users(firstName, lastName, address, phoneNumber, email) VALUES ('${data['input-fName']}', '${data['input-lName']}',  '${data['input-address']}', '${data['input-pNumber']}',  '${data['input-email']}' )`;
    db.pool.query(insertUser, function(error, rows, fields){

         // Check to see if there was an error
        if (error){
            console.log(error)
            res.sendStatus(400);
        }

        else{

            res.redirect('/users');

        }


    })

   

})






/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

    
// flip3