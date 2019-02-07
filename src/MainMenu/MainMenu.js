import React from 'react';
import './MainMenu.css';

const mainMenu = props => {
    return (
        <div className="main-menu">
            <h1>The Hangman</h1>
            <button onClick={props.play}>Play</button>
            {/* <button>About</button> */}
        </div>
    )
}

export default mainMenu;