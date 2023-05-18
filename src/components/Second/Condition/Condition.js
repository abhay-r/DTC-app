import React, { useState } from 'react'
import './Condition.css'
import List from './List'
const Condition = ({id,issues,question}) => {
    
  // console.log(id.id,question.length)
  return (
    <div className="section">
    <div className='condition'>
        
        
                    <List question={question} issues={issues} id={id}/>
                
           
    
       
    </div>
    </div>
  )
}

export default Condition