
// Setting Global variables
var wordList = ["Ana", "Bastion", "DVa", "Doomfist", "Genji", "Hanzo", "Junkrat", "Lucio", "McCree", "Mei", "Mercy", "Orisa", "Pharah", "Reaper", "Reinhardt", "Roadhog", "Soldier 76", "Sombra", "Symmetra", "Torbjorn", "Tracer", "Widowmaker", "Winston", "Zarya", "Zenyatta"],
	targetWord = "",
	userGuess = "",
	guesses = [],
	numBlanks = 0,
	lives = 6,
	winCount = 0,
	lossCount = 0,
	keyNum,
	correctGuesses = 0,
	numLetters = 0;

// Setting Shortcut Variables
var el = document.getElementById("hello");
	el2 = document.getElementById("guesses"),
	el3 = document.getElementById("lifeCounter"),
	el4 = document.getElementById("wordToGuess"),
	el5 = document.getElementById("wins"),
	el6 = document.getElementById("losses");


//newGame function determines everything that happens upon a game load
function newGame() {
	//First, we randomize a word from our array and store it to targetWord
	targetWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
	//Next, we separate the letters into a string, saving it to numLetters
	numLetters = targetWord.split("");
	//To generate blanks later, we will store the number of letters in targetWord to numBlanks
	numBlanks = numLetters.length;
	//Here, we draw the number of Lives, wins and losses
	el3.innerHTML = lives;
	el5.innerHTML = winCount;
	el6.innerHTML = lossCount;
	//console out the word chosen for debug/cheating purposes
	console.log("Word to be guessed: " + targetWord);
	//make blanks function invoked
	makeBlanks();
}

//We need to make a function that creates blanks for each letter in targetWord
function makeBlanks () {

	//First, we use a for loop to iterate every index in numBlanks
	for (var i = 0; i < numBlanks; i++) {

		//I decide to make spans for each individual blank, first setting a shortcut variable to create said spans
		var span = document.createElement("span")
		//here, we set an attribute to each span, giving it an id for each value in the targetWord
		var correctValue = span.setAttribute("id", targetWord[i])
		//then we add the spans to the dom
		el4.appendChild(span);
		//an if statement is used here to skip any time there is an "." or space in the array
		if (targetWord[i] === " " || targetWord[i] === ".") {
			//skipping array values
			span.innerHTML = "&nbsp;";
			//we add 1 to correct guess whenever skipped to arrive at win condition correctly
			correctGuesses ++;
		}
		//else statement is used here to populate the blanks
		else {

			span.innerHTML = "__ ";
		}	
	}
}

//This function is used to replace the blanks with the correct guesses 
function fillIn () {
	//we use this to call upon the individual spans created
	var emptySpans = el4.getElementsByTagName("span");
	//for loop used to check every letter in the word
	for (var i = 0; i < targetWord.length; i++) {
		//checks several conditions. first we check if the userguess is correct, then if there are still guesses to be made, then if the guess hasnt been made yet
		if (emptySpans[i].getAttribute("id") === userGuess && lives > 0 && guesses.indexOf(userGuess) === -1) {
			//checks if the keystroke is in our allotted keys (numbers and letters only)
			if (keyNum>=48 && keyNum<=90) {
				//replaces blanks with userGuess
				emptySpans[i].innerHTML = userGuess;
				//debug
				console.log("user guessed: " + userGuess);
				//increment towards our win condition
				correctGuesses++;
				//debug
				console.log("correct guesses: " + correctGuesses);
			}
		}
	}
}

//Clears old blanks on game restart
function newDisplay () {
	//as long as there is a child..
	while (el4.firstChild) {
		//we will continue to remove the first child from the DOM
		el4.removeChild(el4.firstChild)
	}
}	

//Need a function that will write the userguesses to the DOM when incorrect
function guessList () {
	//if statement checks if the guess isn't already in the guesses array and if we still have lives available
	if (guesses.indexOf(userGuess) === -1 && lives>0) {
		//filtering keystrokes
		if (keyNum>=48 && keyNum<=90) {
			//adds incorrect keystroke to the array
			guesses.push(userGuess);
			//publishes to DOM and puts in alphabetical order
			el2.innerHTML = guesses.sort();
			//debug
			console.log("User guesses: " + guesses);
		}
	}
}

//This function will check if the guess is incorrect
function checkGuess () {
	//checking multiple conditions here: if the guess has already been made and isnt in the word and there are still lives available...
	if (targetWord.indexOf(userGuess) === -1 && lives > 0 && guesses.indexOf(userGuess) === -1) {
		//..and its in our alloted keyrange...
		if (keyNum>=48 && keyNum<=90) {
			//then we decrease the lives available
			lives-=1;
			//published to DOM
			el3.innerHTML = lives;
			//debug
			console.log("Lives Remaining: " + lives);
		}
	}
}

//Function to check if win/loss condition has been met
function checkWin () {
	//if the number of letters in the word is equal to the number of correct guesses and we still have lives...
	if (targetWord.length === correctGuesses && lives > 0) {
		//then we increase the wincount..
		winCount++;
		//debug
		console.log("win count: " + winCount);
		//let player know they were successful
		el.innerHTML = "You Win!!!"
		//and we delay for a few seconds to display image and let your victory really sink in
		setTimeout(resetGame, 4000);

	}
	//if we have no more lives...
	if (lives <=0) {
		//then we lose :(
		lossCount++;
		//let the player know they failed
		el.innerHTML = "You LOST!!!!"
		//we even let the console know of our failure
		console.log("loss count: " + lossCount);
		//and we give time to grieve before the game restarts
		setTimeout(resetGame, 4000);


	}

}

// Function to call upon to return to initial state
function resetGame() {
	//clear the puzzle word, the guesses array, win condition, reset lives. then we run the functions needed to start the game anew!
	targetWord = "";
	guesses = [];
	lives = 6;
	correctGuesses = 0;
	el.innerHTML = "Let's Play Hangman!"
	el2.innerHTML = "";
	newGame();
	newDisplay();
	makeBlanks();
}

// Everything that happens when a key is hit
document.onkeyup = function (event) {
	//store the hit key as userGuess and convert to upper case (to match puzzle)
	userGuess = event.key.toUpperCase();
	//store the keycode to check in our functions
	keyNum = event.keyCode;
	//run functions that check to see if DOM needs to be changed
	fillIn();
	checkGuess();
	//add guesses to array
	guessList();
	//and check win condition
	checkWin();
}

// Game load upon page open
document.addEventListener('DOMContentLoaded', function(){
    newGame();
});





