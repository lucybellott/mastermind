import React from 'react'

export default function Secret({sequence, win}) {
    console.log(sequence)
  //create a button for POST request
    
    return (
        <div> 
            
            <div style={{color: "antiquewhite", marginTop:"20px"}}>
                <em style={{fontWeight: "bold"}}>Can you break the hidden code?</em>
                <br/>
                <br/>
                { win === true ? 
                <div>
                    <p>🔑 🔑 🔑 🔑</p>
                    <form>
                        <label>Add your name to the board!</label>
                        <br/>
                        <input type="text" placeholder="Enter your Name"></input>
                        <button type="submit">Submit</button>
                    </form>
                    <br/>
                </div>
            
                 : 

                <div>
                    <p>🔒 🔒 🔒 🔒</p>
                    <p style={{color: "green"}}>Pick four numbers between 0 and 7</p>
                </div>
                }
                
            </div>
        </div>
    )
}
