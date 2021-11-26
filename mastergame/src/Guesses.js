import React from 'react'
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
    
    const [hint, setHint] = useState("")
    const [indexHint, setIndexHint] = useState("")
    const [guessTried, setGuessTried] = useState([])
    const [turns, setTurns] = useState(10)
    const [win, setWin] = useState(false)
    
    let playerGuess = [];
        playerGuess.push(first, second, third, fourth)
    let i;
    let numberCount = 0;
    let wrongIndexCount = 0;
    let arrayOfGuesses =[];


    
     function handleGuess() {
        // console.log(arrayOfGuesses)
        setTurns(() => turns -1)
        arrayOfGuesses.push(playerGuess)
        setGuessTried(`You have tried ${arrayOfGuesses}`)


        for(i = 0; i < sequence.length; i++) {
            
            if (sequence[i] === playerGuess[i]) {
                numberCount++;
                setHint(`${numberCount} right number(s), right position(s)`)
            }
            if (sequence[i] !== playerGuess[i] && playerGuess.includes(sequence[i])) {
                wrongIndexCount++;
                setIndexHint(`${wrongIndexCount} right number(s), wrong position(s)`)
            }
            if (sequence[i] === playerGuess[i] && numberCount == 4) {
                setWin(true)
            }
           
        }
     }

   
    
    
    return (
        <div className="numbers">
            <div>
                <input style={{backgroundColor:"black", color:"green"}} value={first} onChange={handleFirst} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value ={second} onChange={handleSecond} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value={third} onChange={handleThird} type="number"></input>
                <input style={{backgroundColor:"black", color:"green"}} value={fourth} onChange={handleFourth} type="number"></input>
                <br/>
                <br/>
                {turns > 0 && win === true ?
                    <p>You win!</p> 
                    : turns > 0 ?
                        <div>
                        <button type="button" className="btn btn-success" onClick={handleGuess}>Guess!</button>
                        <br/>
                        <br/>
                        <p>You have {turns} guesses left</p>
                        <p>{guessTried}</p>
                        <p>{hint}</p>
                        <p>{indexHint}</p>
                        </div>
                        : <p>You're out of turns</p>
                }
            </div>
        </div>
    )
}
