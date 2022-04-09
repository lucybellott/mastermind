import React from 'react'

export default function Secret({sequence, win}) {
    console.log(sequence)
  //create a button for POST request
    
    return (
        <div> 
            
            <div style={{marginTop:"20px"}}>
                <em>Can you break the hidden code?</em>
                <br/>
                <br/>
                { win === true ? 
                <div>
                    <p>🔑 🔑 🔑 🔑</p>
                    <br/>
                </div>
               : 
                <div>
                    <p>🔒 🔒 🔒 🔒</p>
                    <p>Pick four numbers between 0 and 7</p>
                </div>
                }
                
            </div>
        </div>
    )
}
