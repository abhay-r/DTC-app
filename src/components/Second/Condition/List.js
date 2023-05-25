import React, { useEffect, useState } from 'react'
import './Condition.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const List = ({question,issues,id,setSol, userResponse, setUserResponse,ans, setAns}) => {
  const [yes,setYes] = useState(false)
  const [checked, setChecked] = useState({
    yes: false,
    no: false,
  });
  const navigate = useNavigate()
  const ind = useParams()
  useEffect(() => {
    if (id.id <= userResponse.length) {
      setChecked(userResponse[id.id]);
      // console.log(userResponse[id.id]);
    } else {
      setChecked({
        yes: false,
        no: false,
      });
    }
  }, [id]);
  const handleChange = (option)=>{
    if (option == "yes") {
      setChecked({ yes: true, no: false });
    } else {
      setChecked({ yes: false, no: true });
    }
      
      
  }



  const handleIndex = async () => {
    if (document.getElementById('probeButton').innerHTML === 'Finish') {
      setSol(true);
    }
  
    if (parseInt(ind.id) + 2 >= question.length) {
      document.getElementById('probeButton').innerHTML = 'Finish';
    } else {
      document.getElementById('probeButton').innerHTML = 'Next';
    }
  
    const response = checked.yes ? 'Yes' : 'No';
    const data = {
      question: question[ind.issue][id.id].Que,
      response: response,
    };
  
    try {
      // Make POST request to submit-response route
      await axios.post('http://localhost:5000/submit-response', {
        question: question[ind.issue][id.id].Que,
        response: checked.yes ? 'yes' : 'no'
      })      
      // Handle the success response
      console.log('Response submitted successfully!');
  
      // Rest of your code...
      if ((checked.yes === true && question[ind.issue][id.id].yes[0] === true) || (checked.no === true && question[ind.issue][id.id].No[0] === true)) {
        if (question[ind.issue][id.id].yes[0] === true && checked.yes === true) {
          setAns(true);
        } else {
          setAns(false);
        }
        setSol(true);
      } else {
        setSol(false);
        if (checked.yes === true && question[ind.issue][id.id].yes[0] !== true) {
          navigate(`/${issues}/${parseInt(question[ind.issue][id.id].yes[1])}`);
        } else if (checked.no === true && question[ind.issue][id.id].No[0] !== true) {
          navigate(`/${issues}/${parseInt(question[ind.issue][id.id].No[1]) + 1}`);
        }
      }
    } catch (error) {
      // Handle the error
      console.error('Error submitting response:', error);
    }
  }
  




  return (
    <>
   <div className="boxContainer">
   <div className="description">
   <h2>Step {parseInt(id.id)+1}: {question[ind.issue][id.id].heading}</h2>
   {question[ind.issue][id.id].subHeading.length !==0 ?<h3>{question[ind.issue][id.id].subHeading}</h3>:""}
      <div className="ul">
        <ul>
          {question[ind.issue][id.id].desc.map((element,index)=>{
            return(

              <li key={index}>{element}</li>
            )
          })
   }

        </ul>
       {/* {question[id.id].Note.length !==0? <h3>Note: {question[id.id].Note}</h3>: ''}
       {question[id.id].important.length !==0? <h3>Important!: {question[id.id].important}</h3>: ''} */}
      </div>
   </div>
   
   <div className="question">
    
     <h3>Q. {question[ind.issue][id.id].Que}</h3>
     <div className="answer">
      <div className="ans">
     <label class="rad-label">
    <input type="radio" class="rad-input" value='Yes' onChange={()=>handleChange('yes')} name="rad" checked={checked ? checked.yes : false}/>
    <div class="rad-design"></div>
    <div class="rad-text">Yes</div>
  </label>
  </div>
  <div className="ans">
  <label class="rad-label">
    <input type="radio" class="rad-input"  onChange={()=>handleChange('no')} value='No'  name="rad" checked={checked ? checked.no : false}/>
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
   
   </>
  )
}

export default List