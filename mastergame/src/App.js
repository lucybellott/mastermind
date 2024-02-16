import React from 'react'
import './App.css';
import Game from './Game'
import {useState, useEffect} from 'react'



function App() {

  // used the State hook to store an array of random numbers which will be the hidden sequence
  // created another state variable to handle selected difficulty level
  const [sequence, setSequence] = useState([]) 
  const [selectedMode, setSelectedMode] = useState("easy")
  
  
  //fetch request to generate random sequence of numbers 
  const fetchSequence = () => {
    fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then(resp=>resp.text())
    .then(numbers => {
      const numbersArray = numbers.split("\n")
      numbersArray.pop();
      setSequence(numbersArray)
      })
    }
  
  
  
      useEffect(() => {

        fetchSequence()

    },[])

     


  // Created easySequence variable. 
  // the selectedSequence variable is set to either the easySequence or the full sequence
  const easySequence = sequence.slice(0,2)
  const selectedSequence = selectedMode === "easy" ? easySequence : sequence;

   
  return (
    <div className="numbers">
      <h1>Mastermind</h1>
      <div>
      <select onChange={(e) => setSelectedMode(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="hard">Hard</option>
      </select>
      </div>
   
      <Game sequence={selectedSequence} fetchSequence={fetchSequence} />
    </div> 
  );
}

export default App;
