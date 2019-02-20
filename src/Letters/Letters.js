import React from 'react';
import './Letters.css';
import spaceBar from './space-bar.svg';

const letters = props => {
    let letter = null;
    if(props.letter === " ") {
        letter = (
            <img src={spaceBar} alt="Space Bar" width="18px" height="18px" />
        )
    } else {
        letter = props.letter
    }
    return (
    <div>
        <button className="letters" id={props.id} onClick={props.click}>{letter}</button>
    </div>
    )
}


export default letters;