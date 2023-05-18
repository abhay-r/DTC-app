import React from 'react'
import Header from './Header/Header'
import Main from './Main/Main'
import './Home.css'

const Home = ({setIssue,data,setData,index,setIndex}) => {
  return (
    <div className='Home'>
        {/* <Header/> */}
        <Main setIssue={setIssue} data={data} setData={setData} index={index} setIndex={setIndex}/>
    </div>
  )
}

export default Home