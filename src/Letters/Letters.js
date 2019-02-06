import React from 'react';
import './Letters.css';

const letters = props => {    
    return (
        <div>
            <span className="letters" onClick={props.click}>{props.letter}</span>
        </div>
    )
}


export default letters;