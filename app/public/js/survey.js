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

    const renderModal = function(data){

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

        //Get the employee list to check if the employee took a survey already.
        $.ajax({
            method: "GET",
            url: "api/employees"
        }).then(function (response) {
            const list = response;

            //Check the duplicate
            let duplicate = false;

            list.forEach(e => {
                if (e.name === newEmployee.name) {
                    //Make the duplicate true if there is a duplicate.
                    duplicate = true;
                }
            });

            if (duplicate) {
                console.log("Duplicate employee name");
            }
            else { //Send a survey only if the employee has not sent a survey before.
                $.ajax({
                    method: "POST",
                    url: "api/employees",
                    data: newEmployee
                }).then(function (response) {

                    const data = response;

                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        //Display the matched employee on the Modal window.
                        renderModal(data);
                    }
                });
            }
        });


    }



    // Clicked on the submit button on reservation.html
    $("form").on("submit", getData);

});