import React from 'react';
import './TheHang.css';

const theHang = props => {
    // DISPLAY THE PARTS AS LESS LIVES ARE AVAILABLE
    if(props.lives === 6) {
        document.querySelectorAll(".parts").forEach(part => part.style.display = "none");
    }

    // COUNTER TO MIMIC THE ID OF THE ELEMENT WHOSE STYLE SHOULD CHANGE
    if(props.counter > 0) {
        let counter = props.counter;
        document.getElementById(`${counter}`).style.display = "flex";
    }
    
    return (
        <div className="hang-container">
            <div className="hang-ground"></div>
            <div className="hang-body"></div>
            <div className="hang-top">
                {/* THE MAN THATS BEING HANGED */}
                <div className="hangman">
                    <div className="hangman-head parts" id="1">
                        <div className="hangman-eyes">
                            <div className="hangman-eye"></div>
                            <div className="hangman-eye"></div>
                        </div>
                        <div className="hangman-mouth"></div>
                    </div>
                    <div className="hangman-torso limbs parts" id="2"></div>
                    <div className="hangman-left_hand limbs parts" id="3"></div>
                    <div className="hangman-right_hand limbs parts" id="4"></div>
                    <div className="hangman-left_leg limbs parts" id="5"></div>
                    <div className="hangman-right_leg limbs parts" id="6"></div>
                </div>
            </div>
        </div>
    )
}

export default theHang;