// import React from 'react'
// import {useEffect, useState} from 'react'

// export default function ScoreBoard({win, trialCounter}) {
  
//   const [boardData, setBoardData] = useState([])
//   const [winner, setWinner] = useState("")
  

//   //GET request from backend
//   useEffect(() => {
//     fetch('/games')
//     .then(resp => resp.json())
//     .then(data => {
//         setBoardData(data)
//      })
//     }, [])


 
// //Render sorted winners data from backend
//  const boardInfo = boardData.map(item => {
//         return <>
            
//             <tr key={item.id}>
//                 <td>{item.username}</td>
//                 <td>{item.trials} </td>
//             </tr>
//         </>
//     })


// // returns the largest number of trials 
//  const pastTrials = boardData.map(item => item.trials)
//  let maxTrials = Math.max(...pastTrials)
 
 
//  //Compare new score to existing 10 scores on the board
//  function betterScore () {
    
//     if(trialCounter < maxTrials) {
//             return true
//         }

//     else if (trialCounter >= maxTrials && pastTrials.length < 10)
//         { 
//             return true
//         }  
      
//     }

  
//     //Replacing the last place on the board with new winner that has a better score
//     const displayWinner = (newWinner) => {

//          let winnerArray = [...boardData, newWinner]
           
//             if (winnerArray.length > 10 ) {
                
//                 winnerArray.sort((a, b) => (a.trials > b.trials) ? 1 : -1)
//                 winnerArray.pop()

//             }

//             else {
//                 winnerArray.sort((a, b) => (a.trials > b.trials) ? 1 : -1)
//             }
    
//             return setBoardData(winnerArray)
//     }

    
//     //POST request to the backend when the user submits their name
//     const handleSubmit = (e) => {
//         e.preventDefault()
    
//       let wallData = {
//             username: winner,
//             trials: trialCounter
//             }
    
//             fetch('/games', {
//                 method: 'POST',
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     },
//                 body: JSON.stringify(wallData),
//                 })
//                 .then((res) => res.json())
//                 .then(inputData => {
//                       displayWinner(inputData)
                      
//                       setWinner("")
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                   })
//     }
    
    
//     return (
//       <div>

//         <h4> 🏁 Top 10 Wall of Champions 🏁</h4>
//         <br/>
//             {/* If player wins form is displayed otherwise it's not rendered */}

//             {win === true && betterScore() === true ?
//             <div>
//                 <form onSubmit={handleSubmit}>
//                 <label>Add your name to the Top 10 Wall of Champions!</label>
//                 <br/>
//                 <br/>
//                 <input type="text" placeholder="Enter your Name" value={winner} onChange={(e)=> setWinner(e.target.value)}></input>
//                 <button type="submit" className="btn btn-success">Submit</button>
//                 </form>
//             </div> 
            
//             : null
//             }
//            <br/>
//         <p id="message">Your number of trials must be lower than existing ones to enter the board</p> 

//         <table>
//           <tbody id="score-board">
//             <tr>
//                 <th>Name</th>
//                 <th>Number of trials</th>
//             </tr>
//               {boardInfo}
//           </tbody>
        
//         </table>
        
//     </div>
//   )
// }


import React from 'react'
import {useEffect, useState} from 'react'

export default function ScoreBoard({win, trialCounter, difficulty}) {
  
  const [boardData, setBoardData] = useState([])
  const [winner, setWinner] = useState("")
  
  //GET request from backend
  useEffect(() => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => {
        setBoardData(data)
     })
    }, [])



// useEffect(() => {
//     // Use the full URL in development
//     fetch('http://localhost:3000/games')
//     .then(resp => {
//       if (!resp.ok) {
//         console.error("Response not OK:", resp.status, resp.statusText);
//         return resp.text().then(text => {
//           console.error("Response text:", text);
//           throw new Error(`HTTP error! status: ${resp.status}`);
//         });
//       }
//       return resp.json();
//     })
//     .then(data => {
//       console.log("Retrieved games:", data);
//       setBoardData(data);
//     })
//     .catch(error => {
//       console.error("Error fetching game data:", error);
//     });
//   }, [])

  // Filter scores based on difficulty
  const filteredBoardData = boardData.filter(item => item.difficulty === difficulty)

  //Render sorted winners data from backend, filtered by difficulty
  const boardInfo = filteredBoardData.map(item => {
        return <>
            <tr key={item.id}>
                <td>{item.username}</td>
                <td>{item.trials} </td>
            </tr>
        </>
    })

  // returns the largest number of trials in the current difficulty
  const pastTrials = filteredBoardData.map(item => item.trials)
  const maxTrials = pastTrials.length > 0 ? Math.max(...pastTrials) : 0
 
  //Compare new score to existing 10 scores on the board
  function betterScore() {
    if (pastTrials.length === 0) return true;
    
    if (trialCounter < maxTrials) {
        return true;
    } else if (trialCounter >= maxTrials && pastTrials.length < 10) { 
        return true;
    }  
    return false;
  }
  
  //Replacing the last place on the board with new winner that has a better score
  const displayWinner = (newWinner) => {
    // Get current board data with this new winner
    let winnerArray = [...boardData, newWinner]
       
    // Sort and keep only top 10 for each difficulty
    winnerArray.sort((a, b) => (a.trials > b.trials) ? 1 : -1)
    
    // Set the updated board data
    setBoardData(winnerArray)
  }
    
  //POST request to the backend when the user submits their name
  const handleSubmit = (e) => {
    e.preventDefault()

    let wallData = {
        game: {
        username: winner,
        trials: trialCounter,
        difficulty: difficulty
        }
    }

    fetch('/games', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wallData),
    })
    .then((res) => res.json())
    .then(inputData => {
          displayWinner(inputData)
          setWinner("")
    })
    .catch((error) => {
        console.log(error)
    })
  }
    
  return (
    <div>
     <h4> 🏁 Top 10 Wall of Champions {difficulty ? `- ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ` : ''} 🏁</h4>
      <br/>
      {/* If player wins form is displayed otherwise it's not rendered */}
      {win === true && betterScore() === true ?
      <div>
          <form onSubmit={handleSubmit}>
          <label>Add your name to the Top 10 Wall of Champions!</label>
          <br/>
          <br/>
          <input type="text" placeholder="Enter your Name" value={winner} onChange={(e)=> setWinner(e.target.value)}></input>
          <button type="submit" className="btn btn-success">Submit</button>
          </form>
      </div> 
      : null
      }
      <br/>
      <p id="message">Your number of trials must be lower than existing ones to enter the board</p> 

      <table>
        <tbody id="score-board">
          <tr>
              <th>Name</th>
              <th>Number of trials</th>
          </tr>
          {boardInfo}
        </tbody>
      </table>
      <br/>
    </div>
  )
}