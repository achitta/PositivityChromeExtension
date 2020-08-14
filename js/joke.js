$(function() {
    $.get("https://official-joke-api.appspot.com/random_joke", function(data) {
        document.getElementById("jokeSetup").innerHTML = data.setup;
        document.getElementById("jokePunchline").innerHTML = data.punchline;
    })
});

$(function() {
    $("#refresh").click(function() {
        document.location.reload();
    })
});