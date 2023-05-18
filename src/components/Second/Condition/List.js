import React, { useEffect, useState } from 'react'
import './Condition.css'
import { useNavigate } from 'react-router-dom'
const List = ({question,issues,id}) => {
  const [yes,setYes] = useState(false)
  const [checked,setChecked] = useState(false)
  const navigate = useNavigate()
  
  // useEffect(()=>{
  //   if(index+1 >= question.length){
  //     setYes(true)
  //   }
  // },[index])
  // console.log(id.id)
  const handleChange = ()=>{
      setChecked(true)
  }
  const handleIndex = ()=>{
    // console.log(document.querySelectorAll('.rad-design'))
    if(parseInt(id.id)+1 >= question.length){
      setYes(true)
      document.getElementById('probeButton').innerHTML = 'Finish'
    }
    else{
      document.getElementById('probeButton').innerHTML = 'Next'
      navigate(`/${issues}/${parseInt(id.id)+1}`)
    }
    
    
  }
  return (
   <div className="boxContainer">
   <div className="description">
   <h2>Step {parseInt(id.id)+1}: {question[id.id].heading}</h2>
   {question[id.id].subHeading.length !==0 ?<h3>{question[id.id].subHeading}</h3>:""}
      <div className="ul">
        <ul>
          {question[id.id].desc.map((element,index)=>{
            return(

              <li key={index}>{element}</li>
            )
          })
   }

        </ul>
       {question[id.id].Note.length !==0? <h3>Note: {question[id.id].Note}</h3>: ''}
       {question[id.id].important.length !==0? <h3>Important!: {question[id.id].important}</h3>: ''}
      </div>
   </div>
   
   <div className="question">
    
     <h3>Q. {question[id.id].Que}</h3>
     <div className="answer">
      <div className="ans">
     <label class="rad-label">
    <input type="radio" class="rad-input" disabled={yes} onChange={handleChange} name="rad"/>
    <div class="rad-design"></div>
    <div class="rad-text">Yes</div>
  </label>
  </div>
  <div className="ans">
  <label class="rad-label">
    <input type="radio" class="rad-input"  onChange={handleChange} disabled={yes} name="rad"/>
    <div class="rad-design"></div>
    <div class="rad-text">No</div>
  </label>
  </div>
   </div>
  <div className="button">
      <button type='button'id='probeButton' onClick={handleIndex}>Next </button>
  </div>
   </div>
   </div>
  )
}

export default List