import React, { useState } from 'react'
import './Condition.css'
import List from './List'
import { useParams } from 'react-router-dom'
const Condition = ({id,issues,question, userResponse, setUserResponse}) => {
  const [sol, setSol] = useState(false)
  const [ans, setAns] = useState('')
  
  // console.log(id.id,question.length)
  const i = useParams()
  // console.log(question[i.issue][parseInt(i.id)].yes[2])
  return (
    <div className="section">
    <div className='condition'> 
                    <List question={question} issues={issues} ans={ans} setAns={setAns} setSol={setSol} id={id} userResponse={userResponse} setUserResponse={setUserResponse}/>
    </div>
   
    <div className="solution" style={{display:sol?'block': 'none'}}>
    <h2>Solution</h2>
    <h3>{ans ? question[i.issue][parseInt(i.id)].yes[2]: question[i.issue][parseInt(i.id)].No[2]}</h3>
   </div>
   
    </div>
  )
}

export default Condition