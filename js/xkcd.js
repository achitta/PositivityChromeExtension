const maxNumComics = 2345;
var currIdx;

$(function() {
    displayComic();
});

function displayComic() {
    var idx = Math.floor(Math.random() * maxNumComics);
    currIdx = idx;
    var url = "https://xkcd.com/"+ idx + "/info.0.json"
    document.querySelector("#comicLink").href = "https://xkcd.com/"+ idx;
    $.getJSON(url, (data) => {
        document.getElementById("comicTitle").innerHTML = data.safe_title + " (#" + data.num + ")";
        document.querySelector("#comicImage").src = data.img;
        document.querySelector("#comicImage").alt = data.alt;
    })
}

$(function() {
    $("#comicLink").click(function() {
        var newURL = document.getElementById("comicLink").href;
        chrome.tabs.create({ url: newURL });
    })
});

$(function() {
    $("#refresh").click(function() {
        displayComic();
    })
});