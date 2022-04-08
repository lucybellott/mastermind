import React from 'react'
import HiddenCode from './HiddenCode'
import ScoreBoard from './ScoreBoard'
import {useState} from 'react'


export default function Game({sequence}) {


    const [inputData, setInputData] = useState({
        first: "0",
        second: "0",
        third: "0",
        fourth: "0"
      })
    
    // const [first, setFirst] = useState("0")
    // const [second, setSecond] = useState("0")
    // const [third, setThird] = useState("0")
    // const [fourth, setFourth] = useState("0")

    const [turns, setTurns] = useState(10)
    
    const [win, setWin] = useState(false)
   
    const [logData, setLogData] = useState([])
    
    const [trialCounter, setTrialCounter] = useState(0)

    // let inputArray = [];
    // let j;
    // for(j=0; j<4; j++) {
    //     inputArray.push("1")
    // }
    
    //not able to generate inputs through map
    // const [guessInputs, setGuessInputs] = useState(inputArray)
    
    // const handleInputs = (e, index) => {
    //     let temp = guessInputs
    //     temp[index] = e.target.value
    //     setGuessInputs(temp)
    //     console.log(temp)
    // }

    // const singleInput = guessInputs.map(oneinput => {
    //     return<>
    //         <input type="text" value={oneinput} onChange={handleInputs}/>
    //     </>
    // })
    

    //make this one function for all inputs that won't allow a number higher than 7 to be entered
    // const handleFirst = (e) => {
    //      if (e.target.value >= 0 && e.target.value <= 7) {
    //          setFirst(e.target.value) 
    //      }}
    
    // const handleSecond = (e) => setSecond(e.target.value)
    // const handleThird = (e) => setThird(e.target.value)
    // const handleFourth = (e) => setFourth(e.target.value)

    const handleChange = (e) => {
        if (e.target.value >= 0 && e.target.value <= 7) { 
             setInputData({ ...inputData, [e.target.name]: e.target.value })
    }}
    
  
    let playerGuess = [];
    playerGuess.push(inputData.first, inputData.second, inputData.third, inputData.fourth)
    console.log(playerGuess)
    
    let i;
    let rightNumberAndIndexCount = 0;
    let wrongIndexCount = 0;
   
   
     function handleGuess() {
        let rightNumberAndIndex = ""
        let wrongIndex = ""
        let allWrongGuess =""
        setTurns(() => turns -1)
        setTrialCounter(() => trialCounter +1)
        
        
        
        for(i = 0; i < sequence.length; i++) {
           
            if (sequence[i] === playerGuess[i]) {
                rightNumberAndIndexCount++;
                rightNumberAndIndex = ` ${rightNumberAndIndexCount} right number(s) in the right position(s)`
                
            }
            if (sequence[i] !== playerGuess[i] && playerGuess.includes(sequence[i])) {
                wrongIndexCount++;
                wrongIndex =`${wrongIndexCount} right number(s) in the wrong position(s)`
            }
            
            if (sequence[i] === playerGuess[i] && rightNumberAndIndexCount === 4) {
                setWin(true)
            }
           
      }
       
        if(rightNumberAndIndex === "" && wrongIndex ==="" ){
            allWrongGuess = "No correct numbers"
        } 
        const data = {correctAnswer: rightNumberAndIndex, 
                      guessedSequence: playerGuess, 
                      wrongPosition: wrongIndex,
                      wrongGuess: allWrongGuess
                    }
        
        setLogData([...logData, data])
                
     }
    
   
    return (
        
        <div style={{margin:"0", overflow:"auto"}} className="numbers">
            <HiddenCode sequence={sequence} win={win}/>
           
            <div>
                <div>
                 
                <input className="number-input" style={{backgroundColor:"black", color:"green"}} name="first" value={inputData.first} onChange={handleChange} type="number"></input>
                <input className="number-input" style={{backgroundColor:"black", color:"green"}} name="second" value ={inputData.second} onChange={handleChange} type="number"></input>
                <input className="number-input" style={{backgroundColor:"black", color:"green"}} name="third" value={inputData.third} onChange={handleChange} type="number"></input>
                <input className="number-input" style={{backgroundColor:"black", color:"green"}} name="fourth" value={inputData.fourth} onChange={handleChange} type="number"></input>
                <br/>
                <br/>
                </div>
              
                
                {turns > 0 && win === true ?
                    <h4 style={{color: "limegreen"}}>👏👏🎉 You win!!! 🎉👏👏</h4> 
                    : turns > 0 ?
                     <div>
                        <button type="button" className="btn btn-success" onClick={handleGuess}>Guess!</button>
                        <br/>
                        <br/>
                        <p>You have {turns} guesses left</p>
                       
                        <hr/>
                        {logData.map((item, index) => 
                            
                           <div key={index}>
                              <p>You guessed {item.guessedSequence}.</p>
                              <span style={{color: "limegreen"}}>{item.correctAnswer}</span> 
                              <span style={{color: "red"}}>{item.wrongPosition}</span> <span style={{color: "red"}}>{item.wrongGuess}</span> 
                              <br/><br/>
                            </div> )}
                            
                        </div>
                        : <h5>❌ You're out of guesses ❌</h5>
                }
            </div>
            <hr/>
            <ScoreBoard win={win} trialCounter={trialCounter}/>
         </div>
        
     
    )
}
