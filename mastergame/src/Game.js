import React from 'react'
import HiddenCode from './HiddenCode'
import ScoreBoard from './ScoreBoard'
import {useState} from 'react'

//Game takes generated sequence as prop
export default function Game({sequence}) {

    //Setting state for guess inputs
    const [inputData, setInputData] = useState({
        first: "0",
        second: "0",
        third: "0",
        fourth: "0"
      })



    const [turns, setTurns] = useState(10)
    
    const [win, setWin] = useState(false)

   //logData stores each guess made by the player
    const [logData, setLogData] = useState([])
    
    const [trialCounter, setTrialCounter] = useState(0)

    //Pushing input values into one array of current guesses
    let playerGuess = [];
    playerGuess.push(inputData.first, inputData.second, inputData.third, inputData.fourth)
    
   
   
    //onChange function for handling guess inputs
    const handleChange = (e) => {
       
        //number entered can't be higher than 7
        if (e.target.value >= 0 && e.target.value <= 7) { 
            setInputData({ ...inputData, [e.target.name]: e.target.value })
    }}
    
    //variables to display the correctness of the playerGuess
    let i;
    let rightNumberAndIndexCount = 0;
    let wrongIndexCount = 0;
   
   //onClick logic, gets called when player hits the Guess button
     
   function handleGuess() {

        //variables to handle hints that will be displayed depending on playerGuess
        let rightNumberAndIndex = ""
        let wrongIndex = ""
        let allWrongGuess =""
        
        //updates turns and trial
        setTurns(() => turns -1)
        setTrialCounter(() => trialCounter +1)
        
        
        //comparing playerGuess with generated sequence
        for(i = 0; i < sequence.length; i++) {
           
            //right number in the right position
            if (sequence[i] === playerGuess[i]) {
                rightNumberAndIndexCount++;
                rightNumberAndIndex = ` ${rightNumberAndIndexCount} right number(s) in the right position(s)`
                
            }

            //right number in the wrong position
            if (sequence[i] !== playerGuess[i] && playerGuess.includes(sequence[i])) {
                wrongIndexCount++;
                wrongIndex =`${wrongIndexCount} right number(s) in the wrong position(s)`
            }
            
            //sets win to true
            if (sequence[i] === playerGuess[i] && rightNumberAndIndexCount === 4) {
                setWin(true)
            }
           
      }
       //No correct numbers guessed
        if(rightNumberAndIndex === "" && wrongIndex ==="" ){
            allWrongGuess = "No correct numbers"
        } 
        
        // Data to display guess and feedback
        const data = {correctAnswer: rightNumberAndIndex, 
                      guessedSequence: playerGuess, 
                      wrongPosition: wrongIndex,
                      wrongGuess: allWrongGuess
                    }
        
        setLogData([...logData, data])

        //console.log(playerGuess)

       
                
    }
    
   
    return (
        
        <div className="numbers">
            <HiddenCode sequence={sequence} win={win}/>
           
            <div>
                <div>
                   
                <input className="number-input" name="first" value={inputData.first} onChange={handleChange} type="number"></input>
                <input className="number-input" name="second" value ={inputData.second} onChange={handleChange} type="number"></input>
                <input className="number-input" name="third" value={inputData.third} onChange={handleChange} type="number"></input>
                <input className="number-input" name="fourth" value={inputData.fourth} onChange={handleChange} type="number"></input>
                <br/>
                <br/>
                </div>
                
                {/* Depending on the state of the game it will display different elements */}
                
                {/* if win is true */}
                {turns >= 0 && win === true ?
                    <>
                    <h4 className="win">👏👏 You win!!! 👏👏</h4> 
                    <br/>
                    <h5>Trials: {trialCounter}</h5>
                    </>
                    // if player still has turns left
                    : turns > 0 ?
                     <div>
                        <button type="button" className="btn btn-success" onClick={handleGuess}>Guess!</button>
                        <br/>
                        <br/>
                        <p>You have {turns} guesses left</p>
                       
                        <hr/>
                        {/* display feedback */}
                        {logData.map((item, index) => 
                            
                           <div key={index}>
                              <p>You guessed {item.guessedSequence}.</p>
                              <span className="win">{item.correctAnswer}</span> 
                              <span className="warning">{item.wrongPosition}</span> <span className="warning">{item.wrongGuess}</span> 
                              <br/><br/>
                            </div> )}
                            
                        </div>
                        // no more guesses left
                        : <h5>❌ You're out of guesses ❌</h5>
                }
            </div>
            <hr/>
            <ScoreBoard win={win} trialCounter={trialCounter}/>
         </div>
        
     
    )
}
