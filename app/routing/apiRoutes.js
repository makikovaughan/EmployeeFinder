const employeeList = require('../data/employees.js');

//Checking the matched employee
const getMatchedEmployee = function (employee, cb) {

    const employeeResult = [];

    employeeList.forEach(e => {

        let total = 0;

        for (let i = 0; i < employeeList.length; i++) {
            total += Math.abs(parseInt(employee.scores[i]) - parseInt(e.scores[i]));
        }
        //Pushed the score result
        employeeResult.push(total);
    });

    //Checking the minimum score based on the new survey
    const min = Math.min(...employeeResult);

    //Finding the index based on the min score
    const index = employeeResult.indexOf(min);

    //Assign the matched employee data
    matchedEmployee = employeeList[index];

    //Call back function
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

            //Pushed the new information to the employee list.
            employeeList.push(req.body);

            //Return the matched employee information to the client
            res.json(matchedEmployee);

            //End the connection.
            res.end();

        });

    });

}