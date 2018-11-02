const employeeList = require('../data/employees.js');
const validator = require('validator');

const validateDuplicate = function(employee, list){

    let duplicate = false;

    list.forEach(e => {
        if(e.name === employee.name && e.photo === employee.photo){
            duplicate = true;
        }
    });

    return duplicate;

}

const validateSurvey = function(employee){

    let flag = false;

    employee.scores.forEach(e => {
        if(!validator.isInt(e, {gt:0, lt:6})){
            flag = true;
        }
        
    });

    return flag;
}

module.exports = function (app) {

    //Send the employeeList
    app.get('/api/employees', function (req, res) {
        res.json(employeeList);
    });

    //Receive the user's survey
    app.post("/api/employees", function (req, res) {

        const employee = req.body;
        const name = req.body.name.split(" ").join("");

        //Check matched employee and error validation
        require("./matchedEmployee.js")(employee, employeeList, function(matchedEmployee){
            if (!validator.isURL(employee.photo)) {

                //Notify error if the picture URL is not correct.
                res.status(400).json({ msg: "Invalid image URL."});

            }
            else if(!validator.isAlpha(name)){
                //Notify error if the name contains other than alphabet.
                res.status(400).json({ msg: "Invalid name." });
            }
            // Check the duplicate employee
            else if(validateDuplicate(employee, employeeList)){
                res.status(400).json({msg: "Duplicate employee name."});
            } 
            //Validate the survey value.
            else if(validateSurvey(employee)){
                res.status(400).json({msg: "Bad data for survey."});
            }
            else{
                //Pushed the new information to the employee list.
                employeeList.push(employee);

                // Return the matched employee information to the client
                // End connection
                res.json(matchedEmployee);
            }
        });

    });

}