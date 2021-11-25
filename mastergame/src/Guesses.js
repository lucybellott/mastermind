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
    
    
    let playerGuess = []
    playerGuess.push(first, second, third, fourth)
    let maxTurns = 10
    let currentTurn = 0
    let i;
    // console.log(playerGuess)
    // console.log(sequence)

    function handleGuess() {
        for(i = 0; i < sequence.length; i++) {
            if(playerGuess[i] === sequence[i]) {
                console.log(playerGuess[i])
            }
        }
    }
    
    
    
    return (
        <div>
            <div style={{float:'left'}} className="numbers">
                <input value={first} onChange={handleFirst} type="number"></input>
                <input value ={second} onChange={handleSecond} type="number"></input>
                <input value={third} onChange={handleThird} type="number"></input>
                <input value={fourth} onChange={handleFourth} type="number"></input>
                <br/>
                <button onClick={handleGuess}>Guess!</button>
            </div>
        </div>
    )
}
