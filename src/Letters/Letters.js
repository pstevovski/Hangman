import React from 'react';
import './Letters.css';

const letters = props => {
    return (
    <div>
        <button disabled={props.disabled} className="letters" id={props.id} onClick={e => props.click(e, props.letter, props.id)}>{props.letter}</button>
    </div>
    )
}


export default letters;