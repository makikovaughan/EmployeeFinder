$(function () {
    const getScore = function () {

        const scoreArray = [];

        for (let i = 0; i < 10; i++) {
            scoreArray.push($(`#formControlSelect${i+1}`).val());
        }

        return scoreArray;

    }


    //Retrieve data from reservation.html
    const getData = function (e) {

        e.preventDefault();

        const newEmployee = {
            name: $("#employee-name").val().trim(),
            photo: $("#employee-photo").val().trim(),
            scores: getScore(),
        }

        console.log(newEmployee);

    }



    // Clicked on the submit button on reservation.html
    $("form").on("submit", getData);

});