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

    const renderModal = function (data) {

        //Populate the result
        $("#matched-person").text(data.name).append("<br>");
        const img = $("<img>").addClass("img-fluid").attr("src", data.photo);
        $("#matched-person").append(img);

        //Open a pop up window to display
        $("#myModal").modal();

    }


    //Retrieve data from reservation.html
    const getData = function (e) {

        e.preventDefault();

        //New employee survey
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

            const employee = response;

            //Display the matched employee on the Modal window.
            renderModal(employee);

        }).catch(function (err) {
            //Show the error message to the customer.
            const errorDiv = $(`<div class="alert alert-danger show" style="position: fixed; top: 0; left: 50%; margin-left: -100px;">${err.responseJSON.msg}</div>`);
            $("body").prepend(errorDiv);

            //Make the error message disappeared after 5 seconds.
            setTimeout(function(){
                errorDiv.remove();
            }, 5000);
        });

    }



    // Clicked on the submit button on reservation.html
    $("form").on("submit", getData);

});