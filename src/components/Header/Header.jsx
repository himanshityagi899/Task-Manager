import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div className='header-wrapper'>
        <img className="logo" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} />
        
        <ul className='navList'>
            <li><a className="nav-link cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Pricing</a></li>
            <li><a className="nav-link cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" >More Products</a></li>
            <li><a className="nav-link cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" >About Us</a></li>
        </ul>
    </div>
  )
}

export default Header;
