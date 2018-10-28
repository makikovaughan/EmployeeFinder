//Using path
const path = require('path');


module.exports = function (app) {


    // Go to home.html to be a default.
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    //Go to survey page
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../app/public/survey.html'));
    });

}