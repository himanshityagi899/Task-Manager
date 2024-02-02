import React, { useState } from 'react'
import './Main.css';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

export const Main = () => {
  const [selected,setSelected] = useState("Signup");

  const handleClick=(e)=>{
    setSelected(prev => e.target.name);
  }

  const handleCross=(select)=>{
    setSelected(select);
  }
      
  return (
    <>
    <div className='main-wrapper'>
      <div className='main-inner-wrapper'>
        <img className='main-img' src={`${process.env.PUBLIC_URL}/assets/images/landing-img.png`} alt="" />
        <h2 className='heading'>Effortlessly Prioritize, Collaborate, and Achieve with Task Bucket!</h2>
      </div>
      
      <div className='main-inner-wrapper'>
        { selected === "Signup" ? <Signup handleCross={handleCross}/>:<Login handleCross={handleCross}/> }
      </div>
      
    </div>
    
    </>
  )
}

export default Main;
