//Using express and path
const express = require('express');
const path = require('path');

const app = express();

//Port setup
var PORT = process.env.PORT || 3000;

//Routing
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Starts our server on the predefined PORT
app.listen(PORT, function () {
    console.log(`App is now listening on PORT ${PORT}`)
})