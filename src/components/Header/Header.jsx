import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div className='header-wrapper'>
        <img className="logo" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} />
        
        <ul className='navList'>
            <li><a className="nav-link" href="#">Pricing</a></li>
            <li><a className="nav-link" href="#">More Products</a></li>
            <li><a className="nav-link" href="#">About Us</a></li>
        </ul>
    </div>
  )
}

export default Header;
