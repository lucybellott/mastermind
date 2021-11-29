import React from 'react'
import Secret from './Secret'
import {useState} from 'react'

export default function Guesses({sequence}) {
    

    const [first, setFirst] = useState("0")
    const [second, setSecond] = useState("0")
    const [third, setThird] = useState("0")
    const [fourth, setFourth] = useState("0")

    const handleFirst = (e) => setFirst(e.target.value)
    const handleSecond = (e) => setSecond(e.target.value)
    const handleThird = (e) => setThird(e.target.value)
    const handleFourth = (e) => setFourth(e.target.value)

    const [turns, setTurns] = useState(10)
    const [win, setWin] = useState(false)
    const [logfile, setLogfile] =useState([])
    let playerGuess = [];
        playerGuess.push(first, second, third, fourth)
    let i;
    let rightNumberAndIndexCount = 0;
    let wrongIndexCount = 0;
   


     function handleGuess() {
        let rightNumberAndIndex = ""
        let wrongIndex = ""
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
            if (sequence[i] === playerGuess[i] && rightNumberAndIndexCount == 4) {
                setWin(true)
            }
           
        }
            
        const data = {hint: rightNumberAndIndex, sequence: playerGuess, wrong: wrongIndex}
        setLogfile([...logfile, data])
       
     }

   
    return (
        <div className="numbers">
            <Secret sequence={sequence} win={win}/>
            <div>
                <input style={{backgroundColor:"black", color:"green"}} value={first} onChange={handleFirst} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value ={second} onChange={handleSecond} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value={third} onChange={handleThird} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value={fourth} onChange={handleFourth} type="number"></input>
                <br/>
                <br/>
                {turns > 0 && win === true ?
                    <h4 style={{color: "limegreen"}}>👏👏🎉 You win!!! 🎉👏👏</h4> 
                    : turns > 0 ?
                        <div>
                        <button type="button" className="btn btn-success" onClick={handleGuess}>Guess!</button>
                        <br/>
                        <br/>
                        <p>You have {turns} guesses left</p>
                        

                        {logfile.map(item => <div>
                            <p>You guessed {item.sequence}.</p>
                            <span style={{color: "limegreen"}}>{item.hint}</span> <span style={{color: "red"}}>{item.wrong}</span>
                            <br/><br/>
                            </div> )}
                        </div>
                        : <h5>❌ You're out of guesses ❌</h5>
                }
            </div>
        </div>
    )
}
