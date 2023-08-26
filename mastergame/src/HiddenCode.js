import React from 'react'

export default function HiddenCode({sequence, win}) {
    console.log(sequence)
  
    
    return (
        <div> 
            
            <div style={{marginTop:"20px"}}>
                <h5>Can you crack the code?</h5>
                
                <br/>
                { win === true ? 
                <div>
                    <p>🔑 🔑 🔑 🔑</p> 
                    <br/>
                    <h5>CONGRATS</h5>
                    <img alt="Einstein" src="https://upload.wikimedia.org/wikipedia/en/8/86/Einstein_tongue.jpg"/>
                    <br/>
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
