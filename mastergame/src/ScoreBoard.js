import React from 'react'
import {useEffect, useState} from 'react'

export default function ScoreBoard({win, trialCounter}) {
  
  const [boardData, setBoardData] = useState([])
  const [winner, setWinner] = useState("")

  //GET request from backend
  useEffect(() => {
    fetch('http://localhost:3000/games')
    .then(resp => resp.json())
    .then(data => setBoardData(data))
    }, [])

    
  //render winners data from backend
 const boardInfo = boardData.map(item => {
        return <>
            
            <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.trials} </td>
            </tr>
        </>
    })

 const pastTrials = boardData.map(item => item.trials)
//  console.log(pastTrials)
//  console.log(trialCounter)

 
 //Compare new score to existing 10 scores on the board
 function betterScore () {
    let i;
    for(i=0; i < pastTrials.length; i++) {
        if(trialCounter <= pastTrials[i] && pastTrials.length <= 10) {
            return true
        }
        else {
            return false
        }
      }
 }
    
    //display new winner on board
    const displayWinner = (newWinner) => {

            let winnerArray = [...boardData, newWinner]
              return setBoardData(winnerArray)
    }
    
    //POST request to the backend  
    const handleSubmit = (e) => {
        e.preventDefault()
    
      let wallData = {
            username: winner,
            trials: trialCounter
            }
    
            fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(wallData),
                })
                .then((res) => res.json())
                .then(inputData => displayWinner(inputData))
                setWinner("")
    }
    
    
    return (
      <div>

        <h4> 🏁 Top 10 Wall of Champions 🏁</h4>

            {win === true && betterScore() === true ?
            <div>
                <form onSubmit={handleSubmit}>
                <label>Add your name to the Top 10 Wall of Champions!</label>
                <br/>
                <input type="text" placeholder="Enter your Name" value={winner} onChange={(e)=> setWinner(e.target.value)}></input>
                <button type="submit">Submit</button>
                </form>
            </div> 
            : win === true && betterScore() === false ?
            <p className="warning">Your number of trials must be lower than existing ones</p> 
            : null
       }

        <table>
          <tbody id="score-board">
            <tr>
                <th>Name</th>
                <th>Number of trials</th>
            </tr>
              {boardInfo}
          </tbody>
        
        </table>
        
    </div>
  )
}
