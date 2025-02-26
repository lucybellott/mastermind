//HiddenCode

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
                    
                    <br/>
                    <h5>CONGRATS</h5>
                    <img alt="winner" id="winner" src="https://cdn.pixabay.com/photo/2024/09/30/16/48/ai-generated-9086228_1280.png"/>
                    <br/>
                    <br/>
                </div>
               : 
                <div>
                    <img id="lock-img" alt="lock" src="https://i.postimg.cc/bJ62DZBj/Screen-Shot-2023-12-09-at-6-24-21-PM.png"/>
                    <br/>
                    <br/>
                    <p id="message">Pick numbers between 0 and 7</p>
                </div>
                }
                
            </div>
        </div>
    )
}
