/* global $ */

//hint-msg changes
//guessCounter changes
//playAgainButton append
//background-img added 


$(document).ready(function(){
	
var playersGuess; 
var winningNumber = generateWinningNumber(); 
var guesses = []; 
// var inputGuessEle = $("#guess"); // Cache the Input element (This is the DOM Element)


/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
	return Math.floor(Math.random()*101); 
} 


// Fetch the Players Guess
function playersGuessSubmission(event){
	$('#high-msg').css('display', 'none'); 
	$('#low-msg').css('display', 'none'); 
	$('#duplicate-msg').css('display', 'none'); 
	$('#win-msg').css('display', 'none'); 
	$('#lose-msg').css('display', 'none'); 
	$('.hot').css('display', 'none'); 
	$('.cold').css('display', 'none'); 
	$('#guess-msg').text(''); 


	playersGuess = +document.getElementById('guess').value; 
	document.getElementById('guess').value = ""; 
	// other way 
	// var playersGuess = parseInt(inputGuessEle.val()); 

	// jQuery has several methods that do two different things depending on number and type of arguments
	// One example is the .val() method, which gets the value if nothing is passed
	// or sets the value if an argument is passed
	// inputGuessEle.val(""); // set value to empty string (clear it);

	return playersGuess;
}



// Check if the Player's Guess is a duplicate then the winning number 
function checkGuess(){
	guesses.push(playersGuess); 
	debugger; 
	for(var i = 0; i < guesses.length; i++){
		for(var j = i+1; j < guesses.length; j++)
		if(guesses[i] === guesses[j]){
			guesses.splice(i,1); 
			duplicateGuess(); 
			debugger; 
		}
		
	}
	
	if(guessCounter() === 0){
		youLose(); 
	}
	
	$('#guess-msg').text(guessCounter() + ' guesses remaining'); 
	guessMessage(); 
}

function guessCounter(){
	return 10-guesses.length;
}


//Duplicate Guess Function 
var duplicateGuess = function(){
	$('#duplicate-msg').css('display', 'block'); 
}; 


function guessMessage(){
	//used in the DOM message when checkGuess(); 
	if(playersGuess  === winningNumber){
		youWin(); 
	} else {
		lowerOrHigher(); 
		hotCold(); 
	}
}


//You Win Function 
var playAgainButton = $('<center><button type="button" class="btn-info" id="playAgain">Play Again</button><center>'); 

var youWin = function(){
	$('#win-msg').css('display', 'block');
	//hide msgs and buttons and append img 
	$('#high-msg').css('display', 'none');
	$('#low-msg').css('display', 'none');
	$('#duplicate-msg').css('display', 'none');
	$('#hint-msg').css('display', 'none');
	$('#hot-cold-msg').css('display', 'none');
	$('#gif').css('display', 'none');
	$('#guess').css('display', 'none');
	$('label').css('display', 'none');
	$('.buttons').css('display', 'none');
	$('.guess').append(playAgainButton);
	$('body').css('background-image', 'url("http://winteriscoming.net/wp-content/uploads/2013/06/episode-30-08-1920-810x455.jpg")'); 
}; 



var youLose = function(){
	$('#lose-msg').css('display', 'block');
	//hide msgs and buttons and append img 
	$('#high-msg').css('display', 'none');
	$('#low-msg').css('display', 'none');
	$('#duplicate-msg').css('display', 'none');
	$('#hint-msg').css('display', 'none');
	$('#hot-cold-msg').css('display', 'none');
	$('#gif').css('display', 'none'); 
	$('#guess').css('display', 'none');
	$('label').css('display', 'none');
	$('.buttons').css('display', 'none');
	$('.guess').append(playAgainButton);
	$('body').css('background-image', 'url("http://www.newyorker.com/wp-content/uploads/2015/06/Larson-An-Open-Letter-to-the-White-Walker-Army-1200.jpg")'); 
}; 



// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	if(playersGuess > winningNumber){
		// $('#response-msg').text('Your guess is too high'); 
		$('#high-msg').css('display', 'block'); 
	} else {
		// $('#response-msg').text('Your guess is too low'); 
		$('#low-msg').css('display', 'block'); 	
		
	}
}


var hotCold = function(){
	if (playersGuess <= winningNumber+5 && playersGuess >= winningNumber-5){
		$('.hot-cold-msg').text("You're getting HOT!"); 
		$('.hot-cold').css('display', 'block');
	} else {
		$('.hot-cold-msg').text("You're COLD"); 
		$('.hot-cold').css('display', 'block');
	}
};



// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	$('#hint-msg').css('display', 'block'); 
	$('#hint-msg').text('The answer is: ' + winningNumber); 
}


// Allow the "Player" to Play Again
function playAgain(){
	//new winningNumber, reset everything in the DOM 
	winningNumber = generateWinningNumber(); 
	guesses = []; 
	$('body').css('background-image', 'none'); 
	$('#gif').css('display', 'block');
	$('#question').css('display', 'block');
	$('#guess').css('display', 'block');
	$('#guess-msg').css('display', 'block');
	$('#guess-msg').text('10 guesses remaining'); 

	$('.buttons').css('display', 'block');

	//hide too low, you lose, playagain button, you're cold 
	$('#low-msg').css('display', 'none');
	$('#lose-msg').css('display', 'none');
	$(playAgainButton).css('display', 'none'); 
	$('#hot-cold').css('display', 'none'); 
	$('#win-msg').css('display', 'none'); 
	$('#high-msg').css('display', 'none'); 
	$('#duplicate-msg').css('display', 'none'); 
}


/* **** Event Listeners/Handlers ****  */

// .on takes a string for the event type
// and second argument is the function used
// a function can be passed by its name, putting () calls the function rather than
// providing the function

$('#submitGuess').on('click', function(){
	playersGuessSubmission();
	checkGuess(); //check for equality then guessMessage-- youWin or lowerOrHigher hotcold 
}); 

$('#guess').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		playersGuessSubmission();
		checkGuess(); 
	}
}); 




$('#hint').on('click', function(){
	provideHint(); 
}); 


$(playAgainButton).on('click',function(){
	playAgain(); 
});


});


