import React from 'react';

const word = props => {
    return (
        <div>
            <div>{props.wordLength} <p className={props.theClass}>{props.letter}</p></div>
        </div>
    )
}

export default word;