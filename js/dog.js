$(function() {
    displayDog();
});

function displayDog() {
    var url = "https://dog.ceo/api/breeds/image/random"
    $.getJSON(url, (data) => {
        document.querySelector("#dogImage").src = data.message;
    })
}

$(function() {
    $("#refresh").click(function() {
        displayDog();
    })
});