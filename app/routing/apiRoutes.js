let employeeList = require('../data/employees.js');

module.exports = function (app) {


    //Receive the user's survey
    app.post("/api/survey", function (req, res) {

        employeeList.push(req.body);
        console.log(employeeList);

        res.end();
    });


}