import React from 'react'
import HiddenCode from './HiddenCode'
import {useState} from 'react'


export default function Guesses({sequence}) {


    //turn this into an array of inputs
    const [first, setFirst] = useState("0")
    const [second, setSecond] = useState("0")
    const [third, setThird] = useState("0")
    const [fourth, setFourth] = useState("0")
    
    const [turns, setTurns] = useState(10)
    const [win, setWin] = useState(false)
    
    const [logData, setLogData] = useState([])

   
   //make this one function for all inputs that won't allow a number higher than 7 to be entered
    const handleFirst = (e) => {
         if (e.target.value >= 0 && e.target.value <= 7) {
             setFirst(e.target.value) 
         }
         
    }
    const handleSecond = (e) => setSecond(e.target.value)
    const handleThird = (e) => setThird(e.target.value)
    const handleFourth = (e) => setFourth(e.target.value)

    
   //use array from state as playerGuess
    let playerGuess = [];
    playerGuess.push(first, second, third, fourth)
    console.log(playerGuess)
    
    let i;
    let rightNumberAndIndexCount = 0;
    let wrongIndexCount = 0;
   
    //change this function to include a POST request
     function handleGuess() {
        let rightNumberAndIndex = ""
        let wrongIndex = ""
        let allWrongGuess =""
        setTurns(() => turns -1)
        
        
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
                <input style={{backgroundColor:"black", color:"green"}} value={first} onChange={handleFirst} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value ={second} onChange={handleSecond} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value={third} onChange={handleThird} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value={fourth} onChange={handleFourth} type="number"></input>
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
                        {logData.map(item => 
                            
                           <div>
                              <p>You guessed {item.guessedSequence}.</p>
                              <span style={{color: "limegreen"}}>{item.correctAnswer}</span> 
                              <span style={{color: "red"}}>{item.wrongPosition}</span> <span style={{color: "red"}}>{item.wrongGuess}</span> 
                              <br/><br/>
                            </div> )}
                            
                        </div>
                        : <h5>❌ You're out of guesses ❌</h5>
                }
            </div>
     </div>
    )
}
