var category = null;
var difficulty = "";
var numQuestions = 10;
var results;
var currIndex = 0;
var correct = 0

$(function() {
    getCategories();
});

function getCategories() {
    $('#endDisplay').hide();
    $('#currentQuestion').hide();
    $('#triviaDifficulty').hide();
    $('#triviaNumQuestions').hide();
    $('#triviaCategories').click(function(event) {        
        var flag = true;
        if($(event.target).is('#generalKnowledge')) {
           category = 9;
        } else if ($(event.target).is('#sports')) {
            category = 21;
        } else if ($(event.target).is('#computers')) {
            category = 18;
        } else if ($(event.target).is('#geography')) {
            category = 22;
        } else if ($(event.target).is('#any')) {
            category = null;
        } else {
           flag = false;
        }
        if(flag) {
            getDifficulty(); 
        }
    });
}

function getDifficulty() {
    $('#triviaCategories').hide();
    $('#triviaDifficulty').show();
    $('#triviaDifficulty').click(function(event) {        
        var flag = true;
        if($(event.target).is('#any')) {
           difficulty = null;
        } else if ($(event.target).is('#easy')) {
            difficulty = "easy";
        } else if ($(event.target).is('#medium')) {
            difficulty = "medium";
        } else if ($(event.target).is('#hard')) {
            difficulty = "hard";
        } else {
            flag = false;
        }
        if(flag) {
            getNumQuestions(); 
        }
    });
}

function getNumQuestions() {
    $('#triviaDifficulty').hide();
    $('#triviaNumQuestions').show();
    $('#numQuestionsSubmit').click(function() {
        numQuestions = document.getElementById("numQuestions").value;
        $('#triviaNumQuestions').hide();
        setupGame();
    });
}

function setupGame() {
    var url = "https://opentdb.com/api.php?amount=" + numQuestions;
    if(category != null) {
        url += "&category=" + category;
    }
    if(difficulty != null) {
        url += "&difficulty=" + difficulty;
    }
    $.getJSON(url, (data) => {
        results = data.results;
        $('#currentQuestion').show();
        displayQuestion();
    })
}

function displayQuestion() {
    $('#nextQuestion').hide();
    document.getElementById("currentQuestion").querySelector('#progress').innerHTML = (currIndex + 1) + " / " + numQuestions;
    document.getElementById("currentQuestion").querySelector('#category').innerHTML = "Category: " + results[currIndex].category;
    document.getElementById("currentQuestion").querySelector('#question').innerHTML = results[currIndex].question;
    var correctAnswer = results[currIndex].correct_answer;
    var incorrectAnswers = results[currIndex].incorrect_answers;
    var correct_idx;
    if(results[currIndex].type == "multiple") {
        correct_idx = Math.floor(Math.random()*4);
    }
    else {
        correct_idx = Math.floor(Math.random()*2);
    }
    var i;
    var incorrectIdx = 0;
    var choices = document.getElementById("currentQuestion").querySelector("#answerChoices");
    for(i = 0; i < (1 + incorrectAnswers.length); i++) {
        if(i == correct_idx) {
            var input = document.createElement("input");
            input.type="button";
            input.id="correct";
            input.value = correctAnswer;
            choices.appendChild(input);
            choices.appendChild(document.createElement("br"));
            choices.appendChild(document.createElement("br"));
        }
        else {
            var input = document.createElement("input");
            input.type="button";
            input.id="incorrect";
            input.value = incorrectAnswers[incorrectIdx];
            choices.appendChild(input);
            choices.appendChild(document.createElement("br"));
            choices.appendChild(document.createElement("br"));
            incorrectIdx++;
        }
    }
    $('#answerChoices').click(function(event) {        
        var flag = true;
        if($(event.target).is('#correct')) {
            correct++;
            var para = document.createElement("p");
            var text = document.createTextNode("CORRECT");
            para.appendChild(text);
            choices.appendChild(para);
        } else if ($(event.target).is('#incorrect')) {
            var para = document.createElement("p");
            var text = document.createTextNode("INCORRECT");
            para.appendChild(text);
            choices.appendChild(para);
        } else {
           flag = false;
        }
        if(flag) {
            $('#answerChoices').off('click');
            var inputs = choices.querySelectorAll("input");
            for(i = 0; i < inputs.length; i++) {
                if(inputs[i].id == "correct") {
                    inputs[i].style.backgroundColor = "green";
                }
                else {
                    inputs[i].style.backgroundColor = "red";
                }
            }
            $('#nextQuestion').show();
            $('#nextQuestion').click(function() { 
                currIndex++;
                $('#answerChoices').empty();
                if (currIndex == results.length) {
                    displayEndingScreen();
                }
                else {
                    displayQuestion();
                }
            })
        }
    });
}


function displayEndingScreen() {
    $('#endDisplay').show();
    document.getElementById("endDisplay").querySelector("#results").innerHTML = "You got " + correct + " out of " + numQuestions + " questions correct!";
    $('#refresh').click(function() {
        document.location.reload();
    })
}