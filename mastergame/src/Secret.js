import React from 'react'

export default function Secret({sequence, win}) {
    console.log(sequence)
  
    
    return (
        <div style={{color: "antiquewhite", marginTop:"20px"}}>
            <em style={{fontWeight: "bold"}}>Can you break the hidden code?</em>
            <br/>
            <br/>
            { win === true ? 
            <p>🔑 🔑 🔑 🔑</p> :

            <div>
            <p>🔒 🔒 🔒 🔒</p>
            <p style={{color: "green"}}>Pick four numbers between 0 and 7</p>
            </div>
            }
            
        </div>
    )
}
