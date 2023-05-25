import React, { useEffect } from 'react'
import Condition from './Condition/Condition'
import './Second.css'
import { Outlet, Route, Routes, useParams } from 'react-router-dom'
const Second = ({data,issues,question, userResponse, setUserResponse}) => {
    // console.log(data['brand'])
    // console.log(index)
    // useEffect(()=>{
    //   setIndex(0)
    // })
    const id = useParams()
    // console.log(data)
  return (
    <div className='container2'>
        <div className="details">
           
                  
            <div className="data">
                <h5>Brand Name: </h5>
                <h5>{data['brand']}</h5>
            </div>
            <div className="data">
                <h5>Model No: </h5>
                <h5>{data['model']}</h5>
            </div>
            <div className="data">
                <h5>Case ID: </h5>
                <h5>{data['case']}</h5>
            </div>
            <div className="data">
                <h5>Issue: </h5>
                <h5>{data['issues']}</h5>
            </div>
            <div className="data">
                <h5>Product: </h5>
                <h5>{data['product']}</h5>
            </div>
        
    </div>
    <div className="flow">
        <h2>{data['issues']}</h2>
        <hr />
    </div>
      <Condition issues={issues} question={question} id={id} userResponse={userResponse} setUserResponse={setUserResponse}/>

    <Outlet/>
  
    </div>
  )
}

export default Second