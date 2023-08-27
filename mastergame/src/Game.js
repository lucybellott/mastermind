// import React from 'react'
// import HiddenCode from './HiddenCode'
// // import ScoreBoard from './ScoreBoard'
// import {useState, useEffect} from 'react'


// export default function Game({sequence}) {

//     //Setting state for guess inputs
//     // const [inputData, setInputData] = useState({
//     //     first: "0",
//     //     second: "0",
//     //     third: "0",
//     //     fourth: "0"
//     //   })

    

//     const [inputData, setInputData] = useState("")

    
//     useEffect(() => {
//     const initialInputs = [];
//     for (let i = 0; i < sequence.length; i++) {
//       initialInputs[i] = ''
//      }
//      setInputData(initialInputs);
//     }, [sequence]);



//     const [turns, setTurns] = useState(10)
    
//     const [win, setWin] = useState(false)
   
//     const [logData, setLogData] = useState([])
    
//     const [trialCounter, setTrialCounter] = useState(0)

//     //Pushing input values into one array of guesses
//     let playerGuess = [];
//    // playerGuess.push(inputData.first, inputData.second, inputData.third, inputData.fourth)
//    playerGuess.push(inputData)
//    console.log(playerGuess[0])
   


//     function handleGuess() {
//         const compare = logData.find((i) => {
//           return playerGuess.toString() === i.guessedSequence.toString();
//         });
      
//         if (compare) {
//           alert(`You have already tried that sequence`);
//         } 
        
//         else {
//           let rightNumberAndIndexCount = 0
//           let wrongIndexCount = 0
//           let rightNumberAndIndex = ""
//           let wrongIndex = ""
//           let allWrongGuess =""
//           setTurns(() => turns -1)
//           setTrialCounter(() => trialCounter +1)

//           console.log('guess triggered')
//          // console.log(playerGuess[0])
        
      
//           // Comparing playerGuess with generated sequence
//           for (let i = 0; i < sequence.length; i++) {
//            // console.log(sequence)
           
//             if (sequence[i] === playerGuess[0][i]) {
//                 console.log('this is a test')
//               rightNumberAndIndexCount++;
              
//             } else if (playerGuess[0].includes(sequence[i])) {
//               wrongIndexCount++;
//             }
//           }
      
       
      
//           if (rightNumberAndIndexCount > 0) {
//             rightNumberAndIndex = `${rightNumberAndIndexCount} right number(s) in the right position(s)`;
//           }
//           if (wrongIndexCount > 0) {
//             wrongIndex = `${wrongIndexCount} right number(s) in the wrong position(s)`;
//           }
//               //No correct numbers guessed
//           if(rightNumberAndIndex === "" && wrongIndex ==="" ){
//             allWrongGuess = "No correct numbers guessed"
//           } 
      
      
//           // Data to display feedback
//           const data = {
//             correctAnswer: rightNumberAndIndex,
//             guessedSequence: playerGuess,
//             wrongPosition: wrongIndex,
//             wrongGuess: allWrongGuess
//           };
      
        
          
//           if (rightNumberAndIndexCount === sequence.length) {
//             setWin(true);
//           }

      
//           setLogData([...logData, data]);
//         }
//       }
      
      

//  //console.log(Array.from(sequence))
//  //console.log(typeof sequence)
//  const handleInput = (index, value) => {
//     const newInputs = [...inputData];
//     newInputs[index] = value;
//     setInputData(newInputs);
//   };
    
   
   

//     return (
//         <div className="numbers">
//           <HiddenCode sequence={sequence} win={win} />
      
//           <div>
            
//             <div>
//               {
//                Array.from(sequence).map((number, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   value={inputData[index]}
//                   onChange={(e) => handleInput(index, e.target.value)}
//                   className="number-input"
//                 />
//               ))}
//               <br/>
//               <br/> 
//               </div>
            
      
//             {turns > 0 && !win ? (
//               <div>
//                 <button type="button" className="btn btn-success" onClick={handleGuess}>
//                   Guess!
//                 </button>
//                 <br />
//                 <br />
//                 <p>You have {turns} guesses left</p>
      
//                 <hr />
      
//                 {logData.map((item, index) => (
//                   <div key={index}>
//                     <p>You guessed {item.guessedSequence.join(', ')}.</p>
//                     {item.correctAnswer && <span className="win">{item.correctAnswer}</span>}
//                     {item.wrongPosition && <span className="warning">{item.wrongPosition}</span>}
//                     {item.wrongGuess && <span className="warning">{item.wrongGuess}</span>}
//                     <br />
//                     <br />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <h5>{win ? "YOU WIN!!!" : "❌ You're out of guesses ❌"}</h5>
//             )}
//           </div>
//               {/* hide score board to deploy later */}
//           {/* <hr /> */}
//           {/* <ScoreBoard win={win} trialCounter={trialCounter} /> */}
//         </div>
//       );
      




// }

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
