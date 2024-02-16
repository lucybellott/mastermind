
import React, { useState, useEffect } from 'react';
import HiddenCode from './HiddenCode';
// import ScoreBoard from './ScoreBoard'

export default function Game({ sequence, fetchSequence, setGameOver }) {
  // State to store the player's input data (guesses)
  const [inputData, setInputData] = useState([])
  const [turns, setTurns] = useState(10) //track remaining attempts
  const [win, setWin] = useState(false) // State to track if the player wins
  const [logData, setLogData] = useState([]) //store the history of guesses
  const [trialCounter, setTrialCounter] = useState(0)

  //Function to generate inputs dynamically
  useEffect(() => {
    // Initialize the input data based on the sequence length
    const initialInputs = Array.from({ length: sequence.length }, () => '');
    setInputData(initialInputs);
  }, [sequence])

  // Function to handle the player's guess
  // it checks for duplicate guesses, updates trial counts and turns left, generates feedback messages
  const handleGuess = () => {
    
    const compare = logData.find((i) => {
      return inputData.toString() === i.guessedSequence.toString();
    })

    if (compare) {
      alert(`You have already tried that sequence`);
    } else {
      // Initialize counts and messages
      let rightNumberAndIndexCount = 0
      let wrongIndexCount = 0
      let rightNumberAndIndex = ''
      let wrongIndex = ''
      let allWrongGuess = ''

      setTurns(turns - 1)
      setTrialCounter(trialCounter + 1)

      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === inputData[i]) {
          rightNumberAndIndexCount++;
        } else if (inputData.includes(sequence[i])) {
          wrongIndexCount++;
        }
      }

      // feedback messages
      if (rightNumberAndIndexCount > 0) {
        rightNumberAndIndex = `${rightNumberAndIndexCount} right number(s) in the right position(s)`;
      }
      if (wrongIndexCount > 0) {
        wrongIndex = `${wrongIndexCount} right number(s) in the wrong position(s)`;
      }
      if (rightNumberAndIndex === '' && wrongIndex === '') {
        allWrongGuess = 'No correct numbers guessed';
      }

      //Obj to store info data of past trials
      const data = {
        correctAnswer: rightNumberAndIndex,
        guessedSequence: inputData,
        wrongPosition: wrongIndex,
        wrongGuess: allWrongGuess,
      }

      console.log(turns)

      if (rightNumberAndIndexCount === sequence.length) {
        setWin(true);
        setGameOver(true)
      }

      //new code
      if (turns === 0) {
        setWin(false);
        setGameOver(true)
      }

      if (turns === 1) {
        
        setGameOver(true)
      }

      setLogData([...logData, data])
    }
  };


  const handlePlayAgain = () => {
    // Reset all state variables to restart the game
    //need to fetch new sequence after losing
    setInputData(Array.from({ length: sequence.length }, () => ''));
    setTurns(10);
    setWin(false);
    setLogData([]);
    setTrialCounter(0);

    fetchSequence()
    setGameOver(false)
  };

  // Function to handle input changes
  const handleInput = (index, value) => {
    if (!win) {
      const newInputs = [...inputData];
      newInputs[index] = value;
      setInputData(newInputs)
    }
  };

  return (
    <div className="numbers">
      <HiddenCode sequence={sequence} win={win} />

      <div>
        {!win && ( // Render input fields only if the player hasn't won
          <>
            {sequence.map((number, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={inputData[index]}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => {
                  const key = e.key
                  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', 'Backspace', 'Tab'];
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

        {turns > 0 && !win ? (
          <div>
            <button type="button" className="btn btn-success" onClick={handleGuess}>
              Guess!
            </button>
            <br />
            <br />
            <p>You have {turns} guesses left</p>

            <hr />

     

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
          <div>
          {win ? (
          <>
          <h5> YOU'VE CRACKED THE CODE! </h5>
          <br/>
          <button type="button" className="btn btn-success" onClick={handlePlayAgain}>
            Play Again
          </button>
          </>
          )
          
          : 
          <>
          <h5>❌ You're out of guesses ❌</h5>
          <br/>
          <button type="button" className="btn btn-success" onClick={handlePlayAgain}>
            Play Again
          </button>
          </>}
        </div>
        )}
        
      </div>
    </div>
  );
}
