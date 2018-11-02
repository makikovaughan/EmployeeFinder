const employeeResult = [];

module.exports = function (employee, employeeList, cb) {

    let matchedEmployee = {
        name: "",
        photo: "",
        scores: []
    };

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