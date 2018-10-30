$(function () {
    const getScore = function () {

        const scoreArray = [];

        for (let i = 0; i < 10; i++) {
            //Add all scores
            scoreArray.push(parseInt($(`#formControlSelect${i + 1}`).val()));
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
        }).then(function (response) {

            const data = response;

            console.log(data);

            $("#matched-person").text(data.name);
            const img = $("<img>").addClass("img-fluid").attr("src", data.photo);
            $("#matched-person").append(img);

            $("#myModal").modal();

        });

    }



    // Clicked on the submit button on reservation.html
    $("form").on("submit", getData);

});