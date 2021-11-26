import React from 'react'
import './App.css';
import Guesses from './Guesses'
import {useState, useEffect} from 'react'
import Secret from './Secret'


function App() {

  const [sequence, setSequence] = useState("") 
  
  
  useEffect(() => {
    fetch('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new')
    .then(resp=>resp.text())
    .then(numbers => {
      const numbersArray = numbers.split("\n")
      numbersArray.pop();
      setSequence(numbersArray)

    })
  },[])

//  console.log(sequence)
     
  
  return (
    <div className="numbers">
      <h1>Mastermind</h1>
      
       <Secret sequence={sequence}/>
      <Guesses sequence={sequence}/>
    </div>
  );
}

export default App;
