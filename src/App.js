import React, { Component } from 'react';
import './App.css';
import './Fonts.css';

// IMPORT COMPONENTS
import Letters from './Letters/Letters';
import Word from './Word/Word';
import GameOver from './GameOver/GameOver';
import MainMenu from './MainMenu/MainMenu';
import TheHang from './TheHang/TheHang';
class App extends Component {
  state = {
    letters: [...'qwertyuiopasdfghjklzxcvbnm '],
    word: '',
    typedWord: [],
    livesLeft: 5,
    counter: 0,
    wordClass: '',
    score: 0,
    gameOver: false,
    mainMenu: true,
    playing: false
  }

  // Listen for keys pressed as soon as main component has mounted
  componentDidMount = () => {
      document.body.addEventListener("keyup", e => this.letterClickHandler(e.key));
  }

  updatedTypedWord = [...this.state.typedWord];
  
  // WHEN LETTER IS CLICKED
  letterClickHandler = ( key, index ) => {
    const theWord = [...this.state.word];

    // Cycle trough the chosen word, and check if the entered letter (key) matches a letter
    // at any of the index positions of the chosen word
    for(let i = 0; i < theWord.length; ++i) {
      if(theWord[i] === key) {
        this.updatedTypedWord[i] = key;
      }
    }
    this.setState({typedWord: this.updatedTypedWord})

    // Disable the clicked button
    const keyPressedIndex = this.state.letters.indexOf(key);
    const charIndex = index || keyPressedIndex;

    if(this.state.playing) {
      document.getElementById(charIndex).disabled = true;

      // If the letter pressed is not present in the word to be matched, loose a life
      if(!theWord.includes(key)) {
        this.decreaseLives();
      }
    }

    // Check if the chosen word matches the typed word, if so increase score and give another word
    if(theWord.join('') === this.state.typedWord.join('')) {
      this.setState({wordClass: "matched"});

      setTimeout(() => {
        // Get a random word for the state
        this.getRandomWord();

        this.setState(prevState => ({
          score: ++prevState.score,
          livesLeft: 5,
          counter: 0,          
          typedWord: [],
          wordClass: ''
        }));
        this.updatedTypedWord = [...this.state.typedWord];

        // Re-enable all the buttons (letters) that were previously disabled
        document.querySelectorAll(".letters").forEach(letter => letter.disabled = false)
      }, 1000)
    }
  }

  // LIVES
  decreaseLives = () => {
    // Decrease lives and increase counter when wrong letter is used
    this.setState(prevState => ({
      livesLeft: --prevState.livesLeft,
      counter: ++prevState.counter
    }));

    // If lives number reaches 0, its game over
    if(this.state.livesLeft <= 0) {
      this.setState({
        playing: false,
        gameOver: true,
        typedWord: []
      })
    }
  }

  // START / RESTART GAME
  startGame = () => {
    this.getRandomWord();

    // On restart, reset game over state, score, typed word, lives left and set a new word to guess
    this.setState({
      livesLeft: 5,
      counter: 0,
      score: 0,
      gameOver: false,
      typedWord: [],
      playing: true,
      mainMenu: false
    })

    // Reset the updated typed word array
    this.updatedTypedWord = null;
    this.updatedTypedWord = [...this.state.typedWord];

    // Enable all the buttons (letters) that were disabled in previous game
    document.querySelectorAll(".letters").forEach(letter => letter.disabled = false)
  }

  // EXIT GAME AND GO BACK TO MAIN MENU
  exitGame = () => this.setState({gameOver: false, playing: false, mainMenu: true})

  // GET RANDOM WORD FROM THE WORDS LIST
  getRandomWord = () => {
    const wordsToGuess = ['demo', 'banana', 'democracy', 'dictatorship', 'idiocracy', 'war', 'new york', 'skopje', 'macedonia', 'javascript', 'programming', 'react', 'chocholate', 'beer','coca cola', 'germany', 'france', 'dortmund', 'london', 'barcelona', 'android', 'intelligence', 'warcraft', 'laptop', 'computer', 'keyboard', 'earth', 'mars', 'galaxy', 'samsung', 'apple'];
    const wordIndex = Math.floor(Math.random() * wordsToGuess.length);

    this.setState({
      word: wordsToGuess[wordIndex]
    })
  }

  render() {
    // Generate the letter components for each letter in the alphabet
    const generatedLetters = this.state.letters.map((key, index) => {
      return <Letters letter={key} key={index} id={index} click={this.letterClickHandler.bind(this, key, index)}/>
    })

    // Generate blank fields according to the length of the word that needs to be matched
    const generatedWord = [...this.state.word].map( (word, index) => {
    // Fill in the letters at the appropriate index positions for the word that needs to be matched
      for(let i = 0; i < this.state.typedWord.length; i++) {
        if(this.state.typedWord[i] === word) {
          return <Word wordLength={null} theClass={this.state.wordClass} letter={word} key={index}/>
        }
      }
      return <Word wordLength={null} key={index} />
    })

    // Render Main menu or Game over menu if conditions are met
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
    const playingMenu =
      <div>
        <button className="exit-btn" onClick={this.exitGame}>Exit</button>
        <TheHang lives={this.state.livesLeft} counter={this.state.counter} playing={this.state.playing} />
        <p className="score">Score: <span>{this.state.score}</span></p>
        <div className="the-word">{generatedWord}</div>
        <div className="letterContainer">{generatedLetters}</div>
      </div>;

    return (
      <div className="App">
        {menu}
        {this.state.playing ? playingMenu : null}
      </div>
    );
  }
}

export default App;