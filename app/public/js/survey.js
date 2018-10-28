$(function () {
    const getScore = function () {

        const scoreArray = [];

        for (let i = 0; i < 10; i++) {

            if ($(`#formControlSelect${i + 1}`).val() === "1(Strongly Disagree)") {

                scoreArray.push(1);

            }
            else if ($(`#formControlSelect${i + 1}`).val() === "5(Strongly Agree)") {
                scoreArray.push(5);
            }
            else {
                scoreArray.push(parseInt($(`#formControlSelect${i + 1}`).val()));
            }

            $(`#formControlSelect${i + 1}`).val("");

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

        $("#employee-name").val("");
        $("#employee-photo").val("");

        $.ajax({
            method: "POST",
            url: "api/employees",
            data: newEmployee
        });

    }



    // Clicked on the submit button on reservation.html
    $("form").on("submit", getData);

});