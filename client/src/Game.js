// Game.js

import React, { useState, useEffect } from 'react';
import HiddenCode from './HiddenCode'; 
import ScoreBoard from './ScoreBoard'; 

export default function Game({ sequence, fetchSequence, setGameOver, difficulty }) {
  
  const [inputData, setInputData] = useState([]);
 
  const [turns, setTurns] = useState(10);

  const [win, setWin] = useState(false);
  // Store the history of guesses
  const [logData, setLogData] = useState([]);
  
  const [trialCounter, setTrialCounter] = useState(0);

  // On mount or whenever 'sequence' changes, reset the input fields
  useEffect(() => {
    const initialInputs = Array.from({ length: sequence.length }, () => '');
    setInputData(initialInputs);
  }, [sequence]);

  // Handle the player's guess
  const handleGuess = () => {
    const duplicateGuess = logData.find(
      (item) => inputData.toString() === item.guessedSequence.toString()
    );
    if (duplicateGuess) {
      alert('You have already tried that sequence.');
      return;
    }

    // Initialize counters
    let rightNumberAndIndexCount = 0;
    let wrongIndexCount = 0;

    // Decrement turns, increment the trial count
    setTurns(turns - 1);
    setTrialCounter(trialCounter + 1);

    // Compare the input with the secret sequence
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] === inputData[i]) {
        rightNumberAndIndexCount++;
      } else if (inputData.includes(sequence[i])) {
        wrongIndexCount++;
      }
    }

    // Build feedback for the guess
    const data = {
      guessedSequence: inputData,
      correctAnswer:
        rightNumberAndIndexCount > 0
          ? `${rightNumberAndIndexCount} right number(s) in the right position(s)`
          : '',
      wrongPosition:
        wrongIndexCount > 0 ? `${wrongIndexCount} right number(s) in the wrong position(s)` : '',
      wrongGuess:
        rightNumberAndIndexCount === 0 && wrongIndexCount === 0
          ? 'No correct numbers guessed'
          : '',
    };

    if (rightNumberAndIndexCount === sequence.length) {
      setWin(true);
      setGameOver(true);
    }
    if (turns === 1 && rightNumberAndIndexCount !== sequence.length) {
      setWin(false);
      setGameOver(true);
    }
    setLogData([...logData, data]);
  };

  // Reset the game to its initial state
  const handlePlayAgain = () => {
    setInputData(Array.from({ length: sequence.length }, () => ''));
    setTurns(10);
    setWin(false);
    setLogData([]);
    setTrialCounter(0);
    // fetch a new sequence
    fetchSequence();
    setGameOver(false);
  };

  // Handle user input in each input field
  const handleInput = (index, value) => {
    if (!win) {
      const newInputs = [...inputData];
      newInputs[index] = value;
      setInputData(newInputs);
    }
  };

  // For debugging 
  const test = sequence.map((num) => ` ${num} `);

  return (
    <div className="numbers">
      {/* Display the hidden code if the user wins */}
      <HiddenCode sequence={sequence} win={win} />

      <div>
        {/* Render inputs only if the player hasn't won */}
        {!win && (
          <>
            {sequence.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={inputData[index]}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => {
                  const key = e.key;
                  const allowedKeys = [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    'Backspace',
                    'Tab',
                  ];
                  if (!allowedKeys.includes(key)) {
                    e.preventDefault();
                  }
                }}
                className="number-input"
              />
            ))}
            <br />
            <br />
          </>
        )}

        {/* If player still has turns and hasn't won */}
        {turns > 0 && !win ? (
          <div>
            <button type="button" className="btn btn-success" onClick={handleGuess}>
              Guess!
            </button>
            <br />
            <br />
            <p>You have {turns} guesses left</p>
            <hr />
            {/* Show the history of guesses */}
            {logData.map((item, index) => (
              <div key={index}>
                <p>You guessed {item.guessedSequence.join(', ')}.</p>
                {item.correctAnswer && <span className="win">{item.correctAnswer}</span>}
                {item.wrongPosition && <span className="warning">{item.wrongPosition}</span>}
                {item.wrongGuess && <span className="warning">{item.wrongGuess}</span>}
                <br />
                <br />
              </div>
            ))}
          </div>
        ) : (
          // either win or run out of turns
          <div>
            {win ? (
              <>
                <h5>YOU'VE CRACKED THE CODE!</h5>
                <br />
                <button type="button" className="btn btn-success" onClick={handlePlayAgain}>
                  Play Again
                </button>
                <br />
                <br />
              </>
            ) : (
              <>
                <h5>❌ You're out of guesses ❌</h5>
                <br />
                <h5>The code was: {test}</h5>
                <br />
                <button type="button" className="btn btn-success" onClick={handlePlayAgain}>
                  Play Again
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* render the ScoreBoard with the difficulty level */}
      <ScoreBoard win={win} trialCounter={trialCounter} difficulty={difficulty} />
    </div>
  );
}
