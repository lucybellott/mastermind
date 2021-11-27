import React from 'react'
import {useState, useRef} from 'react'

export default function Guesses({sequence}) {
    

    const [first, setFirst] = useState("0")
    const [second, setSecond] = useState("0")
    const [third, setThird] = useState("0")
    const [fourth, setFourth] = useState("0")

    const handleFirst = (e) => setFirst(e.target.value)
    const handleSecond = (e) => setSecond(e.target.value)
    const handleThird = (e) => setThird(e.target.value)
    const handleFourth = (e) => setFourth(e.target.value)
    
    // const [hint, setHint] = useState("")
    // let refHint = useRef('')
    // const [indexHint, setIndexHint] = useState("")
    // const [guessTried, setGuessTried] = useState([])
    const [turns, setTurns] = useState(10)
    const [win, setWin] = useState(false)
    const [logfile, setLogfile] =useState([])
    let playerGuess = [];
        playerGuess.push(first, second, third, fourth)
    let i;
    let numberCount = 0;
    let wrongIndexCount = 0;
    // let arrayOfGuesses =[];

    
console.log(logfile)
    
     function handleGuess() {
        let rightInfo = ""
        let wrongIndex = ""
        // console.log(arrayOfGuesses)
        setTurns(() => turns -1)
       
        // arrayOfGuesses.push(playerGuess)
        // setGuessTried(`You have tried ${arrayOfGuesses}`)

        
        
        
        for(i = 0; i < sequence.length; i++) {
           
            if (sequence[i] === playerGuess[i]) {
                numberCount++;
                rightInfo = `${numberCount} right number(s), right position(s)`
                // setHint(`${numberCount} right number(s), right position(s)`)
            }
            if (sequence[i] !== playerGuess[i] && playerGuess.includes(sequence[i])) {
                wrongIndexCount++;
                wrongIndex =`${wrongIndexCount} right number(s), wrong position(s)`
                // setIndexHint(`${wrongIndexCount} right number(s), wrong position(s)`)
                
            }
            if (sequence[i] === playerGuess[i] && numberCount == 4) {
                setWin(true)
            }
           
        }
            
        const data = {hint: rightInfo, sequence: playerGuess, wrong: wrongIndex}
        setLogfile([...logfile, data])
       
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
                    <h4 style={{color: "red"}}>👏👏🎊 You win!!! 🎉👏👏</h4> 
                    : turns > 0 ?
                        <div>
                        <button type="button" className="btn btn-success" onClick={handleGuess}>Guess!</button>
                        <br/>
                        <br/>
                        <p>You have {turns} guesses left</p>
                        {/* <p>{guessTried}</p> */}
                        {/* <p>{hint}</p>
                        <p>{indexHint}</p> */}

                        {logfile.map(item => <p>{item.sequence}  <span>{item.hint}</span> <span>{item.wrong}</span></p> )}
                        </div>
                        : <h5>You're out of guesses 🐴</h5>
                }
            </div>
        </div>
    )
}
