//Using express and path
const express = require('express');
const path = require('path');

const app = express();

//Port setup
var PORT = process.env.PORT || 3000;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "app/public")));

//Routing
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Starts our server on the predefined PORT
app.listen(PORT, function () {
    console.log(`App is now listening on PORT ${PORT}`)
})