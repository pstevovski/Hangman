import React from 'react';
import './Letters.css';

const letters = props => {
    return (
    <div>
        <button className="letters" id={props.id} onClick={props.click}>{props.letter}</button>
    </div>
    )
}


export default letters;