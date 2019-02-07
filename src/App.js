import React, { Component } from 'react';
import './App.css';

// IMPORT COMPONENTS
import Letters from './Letters/Letters';
import Word from './Word/Word';
import GameOver from './GameOver/GameOver';
import MainMenu from './MainMenu/MainMenu';

class App extends Component {
  state = {
    letters: [...'abcdefghijklmnopqrstuvwxyz'],
    word: 'banana',
    typedWord: [],
    livesLeft: 5,
    message: '',
    wordMatched: false,
    score: 0,
    gameOver: false,
    mainMenu: true,
    playing: false
  }

  letterClickHandler = ( key, index ) => {
    const theWord = [...this.state.word];

    // Cycle trough the chosen word, and check if the entered letter (key) matches a letter
    // at any of the index positions of the chosen word
    for(let i = 0; i < theWord.length; i++) {
      if(theWord[i] === key) {
        this.setState({
          ...this.state.typedWord.splice(i, 0, key),
        })
      }
    }

    // If the letter pressed is not present in the word to be matched, loose a life
    if(!theWord.includes(key)) {
      this.decreaseLives();
    }

    // Disable the clicked button
    document.getElementById(`${index}`).disabled = true;    

    // Check if the chosen word matches the typed word, if so increase score and give another word
    if(theWord.join('') === this.state.typedWord.join('')) {
      this.setState({
        score: ++this.state.score,
        word: "test",
        typedWord: []
      })

      // Re-enable all the buttons (letters) that were previously disabled
      document.querySelectorAll(".letters").forEach(letter => letter.disabled = false)

      // Display a message
      this.displayMessage("Good job!");
    }
  }

  // CONTROL SCORES
  decreaseLives = () => {
    this.setState({livesLeft: --this.state.livesLeft});

    this.displayMessage("Wrong one!");
  }

  displayMessage = message => {
    this.setState({message: message})

    // Clear the message
    setTimeout(() => {
        this.setState({message: ""})
    }, 1000);
  }

  // START / RESTART GAME
  startGame = () => {
    // On restart, reset game over state, score, typed word, lives left and set a new word to guess
    this.setState({
      word: "idiocracy",
      livesLeft: 5,
      score: 0,
      gameOver: false,
      typedWord: [],
      playing: true,
      mainMenu: false
    })

    // Enable all the buttons (letters) that were disabled in previous game
    document.querySelectorAll(".letters").forEach(letter => letter.disabled = false)
  }


  render() {
    // Generate the letter components for each letter in the alphabet
    const generatedLetters = this.state.letters.map((key, index) => {
      return <Letters letter={key} key={index} id={index} click={this.letterClickHandler.bind(this, key, index)}/>
    })

    
    let wordsClass = "not_matched"; 
    // if(this.state.wordMatched) {
    //   wordsClass = "matched";
    // }

    // Generate blank fields according to the length of the word that needs to be matched
    const generatedWord = [...this.state.word].map( (word, index) => {
      // Fill in the letters at the appropriate index positions for the word that needs to be matched
      for(let i = 0; i < this.state.typedWord.length; i++) {
        if(this.state.typedWord[i] === word) {
          return <Word wordLength={null} theClass={wordsClass} letter={word} key={index}/>
        }
      }
      return <Word wordLength={null} key={index} />
    })

    // Render Game over menu if game was lost
    let menu = null;
    if(this.state.mainMenu) {
      menu = (
        <MainMenu play={this.startGame} />
      )
    }
    if(this.state.gameOver) {
      menu = (
        <GameOver score={this.state.score} restart={this.startGame} exit={this.exitGame}/>
      )
    }

    // PLAYING MENU
    const playingMenu = <div><p>{this.state.message}</p>
    <p>{this.state.score}</p>
    <div className="the-word">{generatedWord}</div>
    <div className="letterContainer">{generatedLetters}</div></div>

    return (
      <div className="App">
        {menu}
        {this.state.playing ? playingMenu : null}
      </div>
    );
  }
}

export default App;

/*
-Keys component
-Words component - where it will display the word that needs to be guessed and create _ _ _ according to its length.
-The hang component(?)

- Decreasing lives as user clicks wrong letter
- Play again - updates state with new word to match
- Start game menu - that based on current state, renders either start menu or the game menu
- Score count
- Add option to use keyboard instead of onscreen letters
*/
