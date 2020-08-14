var apiData;

$(function() {
    $.getJSON("https://type.fit/api/quotes", function(data) {
        apiData = data;
        displayJoke();
    })
});

function displayJoke() {
    var idx = Math.floor(Math.random() * apiData.length);
    document.getElementById("quoteText").innerHTML = apiData[idx].text;
    document.getElementById("quoteAuthor").innerHTML = "- " + apiData[idx].author;
}

$(function() {
    $("#refresh").click(function() {
        displayJoke();
    })
});