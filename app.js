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


/*
    ROUTES
*/
app.get('/', function(req, res){


    res.render('index');

});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

    
// flip3