
var gifs = ["GALAXY", "ALIENS", "STARS", "PLANET", "EARTH"];





// dump content for each button
function displaygifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ejODm49HYzqPrOXASu4F84lnyO1RoXa4";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        response.data.forEach(function (allData) {
            console.log(allData);
            var imgURL = allData.images.fixed_height_still.url;
            var image = $("<img>").attr("src", imgURL);

            $(image).addClass("gifImage");
            $(image).attr("data-still", allData.images.fixed_height_still.url)
            $(image).attr("data-animate", allData.images.fixed_height.url)
            $(image).attr("data-rating", allData.rating);


            $("#gif-display").prepend(image);



            // show rating and alternate between still/animated img source by clicking an image 
            $(".gifImage").on("click", function () {
                var state = $(this).attr("data-state");


                if (state === "still") {
                    $(this).attr("src", this.dataset.animate);
                    $(this).attr("data-state", "animate");
                    $(".rating").text("That gif is rated: " + this.dataset.rating + ".");

                } else {
                    $(this).attr("src", this.dataset.still);
                    $(this).attr("data-state", "still");
                    $(".rating").text("That gif is rated: " + this.dataset.rating + ".");
                }

            });
        });

    });
}


// add new buttons for each item in the gifs array
function renderButtons() {

    $("#button-display").empty();

    for (var i = 0; i < gifs.length; i++) {

        var a = $("<button>");

        a.addClass("gif");

        a.attr("data-name", gifs[i]);

        a.text(gifs[i]);

        $("#button-display").append(a);
    }
}



// function for when "go" button is clicked
$("#addgif").on("click", function (event) {
    event.preventDefault();

    // grabs input from user and converts it to all caps
    var gif = $("#gif-input").val().trim();
    capGif = gif.toUpperCase()
    // test if user's word is already in the gif array. If not, add it
    if (gifs.includes(capGif)) {
        alert("You already have a button for " + gif + " gifs.");
    }
    else {
        gifs.push(capGif);
        console.log(gifs);
        renderButtons();
    }
});


$(document).on("click", ".gif", displaygifInfo);


$(document).on("click", ".gif", function () {
    $('#userInfo').fadeIn('slow', function () {
        $('#userInfo').delay(2000).fadeOut();
    });
});



//display the initial buttons
renderButtons();
