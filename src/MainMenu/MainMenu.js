import React from 'react';
import './MainMenu.css';
import logo from '../github-logo.png'

const mainMenu = props => {
    return (
        <div className="main-menu">
            <h1>The Hangman</h1>
            <button onClick={props.play}>Play</button>
            <a href="https://github.com/pecko95/Hangman"><img src={logo} width="24px" height="24px" alt="GitHub" title="GitHub repository" /></a>

            <footer>
                <p>Created with <span>React</span>. Favicon from <a href="https://www.iconfinder.com/icons/190319/game_hangman_icon">IconFinder</a></p>
            </footer>
        </div>
    )
}

export default mainMenu;