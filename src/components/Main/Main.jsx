import React from 'react'
import './Main.css';
export const Main = () => {
  return (
    <div className='main-wrapper'>
      <img src={`${process.env.PUBLIC_URL}/assets/images/landing-img.png`} alt="" />
      <div className='main-inner-wrapper'>
        <h1>Effortlessly Prioritize, Collaborate, and Achieve with Task Bucket!</h1>
        <div className='main-btn-wrapper'>
          <button className='btn btn-dark'>Login</button>
          <button className='btn btn-dark'>Signup</button>
        </div>
        
      </div>
    </div>
    
  )
}

export default Main;
