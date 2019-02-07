import React, { Component } from 'react';
import './App.css';

// IMPORT COMPONENTS
import Letters from './Letters/Letters';
import Word from './Word/Word';

class App extends Component {
  state = {
    letters: [...'abcdefghijklmnopqrstuvwxyz'],
    word: 'banana',
    typedWord: [],
    livesLeft: 5,
    message: '',
    wordMatched: false
  }

  letterClickHandler = ( key, index ) => {
    const theWord = [...this.state.word];

    // Cycle trough the chosen word, and check if the entered letter (key) matches a letter
    // at any of the index positions of the chosen word
    for(let i = 0; i < theWord.length; i++) {
      if(theWord[i] === key) {
        this.setState({
          ...this.state.typedWord.splice(i, 0, key)
        })
      }
    }

    // Disable the clicked button
    document.getElementById(`${index}`).disabled = true;    

    // Check if the chosen word matches the typed word
    if(theWord.join('') === this.state.typedWord.join('')) {
      // this.setState({wordMatched: true})
        // this.displayMessage();
        // document.querySelectorAll(".letters").forEach(letter => letter.disabled = false)

        // this.setState({
        //   word: "victory",
        //   typedWord: []
        // })
    }
  }

  displayMessage = () => {
    this.setState({message: "You got it right!"})
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

    return (
      <div className="App">
        <p>{this.state.message}</p>
        <div className="the-word">{generatedWord}</div>
        <div className="letterContainer">{generatedLetters}</div>
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
