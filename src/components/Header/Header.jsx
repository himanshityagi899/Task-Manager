import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div className='header-wrapper'>
        <img className="logo" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} />
        
        <ul>
            <li><a href="">Pricing</a></li>
            <li><a href="">More Products</a></li>
            <li><a href="">About Us</a></li>
        </ul>
    </div>
  )
}

export default Header;
