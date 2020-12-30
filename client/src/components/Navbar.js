import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';


export default function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    
                    <ul>
                        <li className=''>
                            <Link to='/' className=''>Home</Link>
                        </li>
                        <li className=''>
                            <Link to='/services' className=''>Services</Link>
                        </li>
                        <li className=''>
                            <Link to='/about'>About</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/demo' className='' >Demo</Link>
                        </li>
                        <li>
                            <Link  to='/sign-up' className=''>SignUp</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}