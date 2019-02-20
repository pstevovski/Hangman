import React from 'react';
import './GameOver.css';

const gameOver = props => {
    return (
        <div className="game-over_menu">
            <h1>GAME OVER</h1>
            <p>You failed to figure out what the correct word was, and now Bill is dead. Don't be like Bill, remember?</p>
            <p>Your score: <span>{props.score}</span></p>
            <div className="game-over_menu-buttons">
                <button onClick={() => props.exit()}>EXIT</button>
                <button onClick={() => props.restart()}>RESTART</button>
            </div>
        </div>
    )
}

export default gameOver;