const employeeList = require('../data/employees.js');

const getMatchedEmployee = function (employee, cb) {

    const employeeResult = [];

    employeeList.forEach(e => {

        let total = 0;

        for (let i = 0; i < employeeList.length; i++) {
            total += Math.abs(parseInt(employee.scores[i]) - parseInt(e.scores[i]));
        }
        employeeResult.push(total);
    });

    const min = Math.min(...employeeResult);

    const index = employeeResult.indexOf(min);

    matchedEmployee = employeeList[index];

    cb(matchedEmployee);

}


module.exports = function (app) {


    //Send the employeeList
    app.get('/api/employees', function (req, res) {
        res.json(employeeList);
    });

    //Receive the user's survey
    app.post("/api/employees", function (req, res) {

        getMatchedEmployee(req.body, function (matchedEmployee) {

            employeeList.push(req.body);

            console.log(matchedEmployee);

            res.json(matchedEmployee);

            res.end();

        });

    });

}