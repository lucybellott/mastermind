import React from 'react'
import './App.css';
import Game from './Game'
import {useState, useEffect} from 'react'



function App() {

  const [sequence, setSequence] = useState("") 
  const [selectedMode, setSelectedMode] = useState("easy")
  
  
  useEffect(() => {
    fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then(resp=>resp.text())
    .then(numbers => {
      const numbersArray = numbers.split("\n")
      numbersArray.pop();
      setSequence(numbersArray)
      })
  },[])

  const easySequence = sequence.slice(0,2)
  const selectedSequence = selectedMode === "easy" ? easySequence : sequence;

   
  return (
    <div className="numbers">
      <h1>Mastermind</h1>
      <div id="dropdown">
      <select onChange={(e) => setSelectedMode(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="hard">Hard</option>
      </select>
      </div>
   
      <Game sequence={selectedSequence} />
    </div> 
  );
}

export default App;
