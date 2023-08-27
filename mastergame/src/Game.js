

import React, { useState, useEffect } from 'react';
import HiddenCode from './HiddenCode';
// import ScoreBoard from './ScoreBoard'

export default function Game({ sequence }) {
  const [inputData, setInputData] = useState([]);
  const [turns, setTurns] = useState(10);
  const [win, setWin] = useState(false);
  const [logData, setLogData] = useState([]);
  const [trialCounter, setTrialCounter] = useState(0);

  useEffect(() => {
    const initialInputs = Array.from({ length: sequence.length }, () => '');
    setInputData(initialInputs);
  }, [sequence]);

  const handleGuess = () => {
    const compare = logData.find((i) => {
      return inputData.toString() === i.guessedSequence.toString();
    });

    if (compare) {
      alert(`You have already tried that sequence`);
    } else {
      let rightNumberAndIndexCount = 0;
      let wrongIndexCount = 0;
      let rightNumberAndIndex = '';
      let wrongIndex = '';
      let allWrongGuess = '';

      setTurns(turns - 1);
      setTrialCounter(trialCounter + 1);

      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === inputData[i]) {
          rightNumberAndIndexCount++;
        } else if (inputData.includes(sequence[i])) {
          wrongIndexCount++;
        }
      }

      if (rightNumberAndIndexCount > 0) {
        rightNumberAndIndex = `${rightNumberAndIndexCount} right number(s) in the right position(s)`;
      }
      if (wrongIndexCount > 0) {
        wrongIndex = `${wrongIndexCount} right number(s) in the wrong position(s)`;
      }
      if (rightNumberAndIndex === '' && wrongIndex === '') {
        allWrongGuess = 'No correct numbers guessed';
      }

      const data = {
        correctAnswer: rightNumberAndIndex,
        guessedSequence: inputData,
        wrongPosition: wrongIndex,
        wrongGuess: allWrongGuess,
      };

      if (rightNumberAndIndexCount === sequence.length) {
        setWin(true);
      }

      setLogData([...logData, data]);
    }
  };

  const handleInput = (index, value) => {
    if (!win) {
      const newInputs = [...inputData];
      newInputs[index] = value;
      setInputData(newInputs);
    }
  };

  return (
    <div className="numbers">
      <HiddenCode sequence={sequence} win={win} />

      <div>
        {!win && (
          <>
            {Array.from(sequence).map((number, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={inputData[index]}
                onChange={(e) => handleInput(index, e.target.value)}
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
          <h5>{win ? 'YOU WIN!!!' : '❌ You\'re out of guesses ❌'}</h5>
        )}
      </div>
    </div>
  );
}
