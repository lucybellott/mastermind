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
    
    //display new winner on board
    const displayWinner = (newWinner) => {
           let winnerArray = [...boardData, newWinner]
           return setBoardData(winnerArray)
       }
    
    //POST request   
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

        <h4>Wall of champions</h4>

        {win === true?
            <div>
                <form onSubmit={handleSubmit}>
                <label>Add your name to the Wall of Champions!</label>
                <br/>
                <input type="text" placeholder="Enter your Name" value={winner} onChange={(e)=> setWinner(e.target.value)}></input>
                <button type="submit">Submit</button>
                </form>
            </div> 
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
