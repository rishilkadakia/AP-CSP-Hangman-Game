// When play button is pressed, game starts. When guess button is pressed, the letter inputted by the user is guessed and function is ran.
onEvent("playButton", "click", function(){
  setScreen("gameScreen");
});
onEvent("guessButton", "click", function(){
  guessLetter(getText("guessInput"));
  setText("previousGuessesText", wrongGuesses);
});

// Creating the initial variables.
var letters = "abcdefghijklmnopqrstuvwxyz";
var rightGuesses = "";
var wrongGuesses = "";
var lives = 5;
var letterCount = 0;

// Creating the list gameWords, which will store the data used for this program.
var gameWords = [];
var words = getColumn("Words", "Word");
for (var i = 0; i < words.length; i++) {
  if (words[i].length == 5){
    appendItem(gameWords, words[i]);
  }
}

// Choosing a random word to be the word the user has to guess out of the list "gameWords", which includes all the 5 letter words of the code.org column "Word" of the dataset "Words".
var correctWord = gameWords[randomNumber(1, gameWords.length)];
console.log(correctWord);

// Function that takes in the letter the user inputs. If the letter is in the word, the letter is updated in one of the 5 boxes. If the letter is not in the word, it is added to the
// Previous Wrong Guesses text area. If the letter has already been guessed, text will appear that says "You Guessed That Already!". If a character is entered that is not a single letter,
// text will appear that says "Please enter a letter from a-z:".
function guessLetter(letter) {
  setText("guessInput", "");
  if (letters.includes(letter.toLowerCase())){
    if (rightGuesses.includes(letter.toLowerCase())){
      setText("yourGuessLabel", "You Guessed That Already!");
    }
    else {
    if (wrongGuesses.includes(letter.toLowerCase())){
      setText("yourGuessLabel", "You Guessed That Already!");
    }
    else{
      if (correctWord.includes(letter.toLowerCase()) == false){
        wrongGuesses = wrongGuesses + " " + letter;
        lives = lives - 1;
        setText("livesLabel", "Lives: " + lives);
        if (lives == 0){
          setScreen("loseScreen");
          setText("loseScreenLabelThree", "The word was: " + correctWord);
        }
      }
      if (correctWord.includes(letter.toLowerCase())){
        rightGuesses = rightGuesses + letter;
        for (var i = 0; i < correctWord.length; i++) {
          if (letter == correctWord[i]){
            setText("letter" + (i + 1), letter);
            letterCount = letterCount + 1;
          }
        }
        if (letterCount == 5){
          setScreen("winScreen");
        }
      }
    }
    }
  }
  else {
    setText("yourGuessLabel", "Please enter a letter from a-z:");
  }
}
