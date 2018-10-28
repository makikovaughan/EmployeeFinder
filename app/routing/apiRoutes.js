const employeeList = require('../data/employees.js');


module.exports = function (app) {


    //Send the employeeList
    app.get('/api/employees', function (req, res) {
        res.json(employeeList);
    });

    //Receive the user's survey
    app.post("/api/employees", function (req, res) {

        employeeList.push(req.body);
        console.log(employeeList);

        res.end();
    });


}