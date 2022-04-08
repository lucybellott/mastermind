import React from 'react'
import './App.css';
import Game from './Game'
import {useState, useEffect} from 'react'



function App() {

  const [sequence, setSequence] = useState("") 
  
  
  useEffect(() => {
    fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then(resp=>resp.text())
    .then(numbers => {
      //cosole.log(numbers)
      const numbersArray = numbers.split("\n")
      numbersArray.pop();
      setSequence(numbersArray)
      //console.log(sequence)

    })
  },[])

   
  return (
    <div className="numbers">
      <h1>Mastermind</h1>
      <Game sequence={sequence} />
    </div> 
  );
}

export default App;
