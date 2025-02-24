// Game.js

import React, { useState, useEffect } from 'react';
import HiddenCode from './HiddenCode'; // adjust if in a different folder
import ScoreBoard from './ScoreBoard'; // adjust if in a different folder

// The Game component
export default function Game({ sequence, fetchSequence, setGameOver }) {
  // State to store the player's guesses
  const [inputData, setInputData] = useState([]);
  // Track remaining attempts
  const [turns, setTurns] = useState(10);
  // Track if the player wins
  const [win, setWin] = useState(false);
  // Store the history of guesses
  const [logData, setLogData] = useState([]);
  // Count how many guesses have been made
  const [trialCounter, setTrialCounter] = useState(0);

  // On mount or whenever 'sequence' changes, reset the input fields
  useEffect(() => {
    const initialInputs = Array.from({ length: sequence.length }, () => '');
    setInputData(initialInputs);
  }, [sequence]);

  // Handle the player's guess
  const handleGuess = () => {
    // Check if this exact sequence was guessed before
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

    // Check for a win
    if (rightNumberAndIndexCount === sequence.length) {
      setWin(true);
      setGameOver(true);
    }

    // If you’re out of turns, game over
    // Note: turns has already been decremented, so check turns === 1
    if (turns === 1 && rightNumberAndIndexCount !== sequence.length) {
      setWin(false);
      setGameOver(true);
    }

    // Update the log
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
    // Prevent changes if the game is already won
    if (!win) {
      const newInputs = [...inputData];
      newInputs[index] = value;
      setInputData(newInputs);
    }
  };

  // For debugging or revealing the sequence if needed
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

        {/* If you still have turns and haven't won */}
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
          // Otherwise, you've either won or run out of turns
          <div>
            {win ? (
              <>
                <h5>YOU'VE CRACKED THE CODE!</h5>
                <br />
                <button type="button" className="btn btn-success" onClick={handlePlayAgain}>
                  Play Again
                </button>
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

      {/* Finally, render the ScoreBoard. 
          Passing in the win and trialCounter props 
          so the scoreboard knows if you won and how many guesses it took.
      */}
      <ScoreBoard win={win} trialCounter={trialCounter} />
    </div>
  );
}
