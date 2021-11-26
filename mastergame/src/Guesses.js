import React from 'react'
import {useState} from 'react'

export default function Guesses({sequence}) {
    console.log(sequence)

    const [first, setFirst] = useState("0")
    const [second, setSecond] = useState("0")
    const [third, setThird] = useState("0")
    const [fourth, setFourth] = useState("0")

    const handleFirst = (e) => setFirst(e.target.value)
    const handleSecond = (e) => setSecond(e.target.value)
    const handleThird = (e) => setThird(e.target.value)
    const handleFourth = (e) => setFourth(e.target.value)
    
    const [hint, setHint] = useState("")
    const [guessTried, setGuessTried] = useState([])
    const [turns, setTurns] = useState(10)
    
    let playerGuess = []
    playerGuess.push(first, second, third, fourth)
    let i;
    let numberCount = 0;
    let arrayOfGuesses =[];
    
    
    

    // let result = sequence.map((element, index) => {
       //     console.log(element, index)
           
           
       //     if (playerGuess[i] === element){
       //        console.log("right number wrong index" + element)
       //     }
           
       //     else if (playerGuess[i] === element && index){
       //         console.log("right number and right index" + element, index)
       //     }
       // })
   
    
       
    function handleGuess() {
        
        setTurns(() => turns -1)
        arrayOfGuesses.push(playerGuess)
        setGuessTried(`you have tried ${arrayOfGuesses}`)
        
        for(i = 0; i < sequence.length; i++) {
            
            if (sequence[i] === playerGuess[i]) {
                numberCount++;
                setHint(`${numberCount} right number(s), right position(s)`)
                
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
                <button type="button" class="btn btn-success" onClick={handleGuess}>Guess!</button>
                <br/>
                <br/>
                <p>You have {turns} guesses left</p>
                <p>{guessTried}</p>
                <p>{hint}</p>
            </div>
        </div>
    )
}
