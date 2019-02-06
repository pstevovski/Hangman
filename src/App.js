import React, { Component } from 'react';
import './App.css';

// IMPORT COMPONENTS
import Letters from './Letters/Letters';

class App extends Component {
  state = {
    letters: [...'abcdefghijklmnopqrstuvwxyz'],
    word: 'democracy',
    typedWord: [],
    livesLeft: 5,
    message: ''
  }

  letterClickHandler = ( key ) => {
    const theWord = [...this.state.word];

    for(let i = 0; i < theWord.length; i++) {
      if(theWord[i] === key) {
        this.setState({
          ...this.state.typedWord.splice(i, 0, key)
        })
      }
    }

    if(theWord.join('') == this.state.typedWord.join('')) {
      // console.log("WORDS MATCH")
      this.displayMessage();
    } else {
      // console.log(theWord.join(''),this.state.typedWord.join(''));
    }

    // console.log(this.state.typedWord);
  }

  displayMessage = () => {
    this.setState({message: "You got it right!"})
  }

  render() {
    // Generate the letter components for each letter in the alphabet
    const generatedLetters = this.state.letters.map((key, index) => {
      return <Letters letter={key} key={index} click={this.letterClickHandler.bind(this, key)}/>
    })

    return (
      <div className="App">
        <p>{this.state.typedWord}</p>
        <p>{this.state.message}</p>;
        <div className="letterContainer">
            {generatedLetters}
        </div>
      </div>
    );
  }
}

export default App;

/*
-Keys component
-Words component - where it will display the pressed keys, and create _ _ _ according to 
the length of the word that needs to be matched.
-The hang component(?)
*/
