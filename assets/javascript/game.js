
// Setting Global variables
var wordList = ["Ana", "Bastion", "D.Va", "Doomfist", "Genji", "Hanzo", "Junkrat", "Lucio", "McCree", "Mei", "Mercy", "Orisa", "Pharah", "Reaper", "Reinhardt", "Roadhog", "Soldier 76", "Sombra", "Symmetra", "Torbjorn", "Tracer", "Widowmaker", "Winston", "Zarya", "Zenyatta"],
	targetWord = "",
	userGuess = "",
	guesses = [],
	lives = 6,
	winCount = 0,
	keyNum
	letNum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Setting Shortcut Variables
var el = document.getElementById("words");
var el2 = document.getElementById("guesses");
var el3 = document.getElementById("lifeCounter");

//Function to grab random word
function newWord() {
	targetWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

// notsure what this is for yet
// var numeric = function (index) {
// 	return letNum.indexOf(index)+65;
// }

//Checks previous guesses, filters keystrokes, and displays guesses
var guessList = function () {
	if (guesses.indexOf(userGuess) === -1 && lives>0) {
		if (keyNum>=48 && keyNum<=90) {
			guesses.push(userGuess);
			el2.innerHTML = guesses.sort();
		}
	}
}

var checkGuess = function () {
	if (targetWord.indexOf(userGuess)===-1 
		&& lives > 0 && guesses.indexOf(userGuess) === -1) {
		if (keyNum>=48 && keyNum<=90) {
			lives-=1;
			el3.innerHTML = lives;
		}
	}
}


function displayWord() {
	while (targetWord == "") {
		newWord();
	}
	el.innerHTML = targetWord;
}

// Function to call upon to return to initial state
function resetGame() {
	targetWord = "";
	guesses = [];
	newWord();
}

document.onkeyup = function (event) {
	userGuess = event.key.toUpperCase();
	keyNum = event.keyCode;
	checkGuess();
	guessList();
}

document.addEventListener('DOMContentLoaded', function(){
    displayWord();
});





