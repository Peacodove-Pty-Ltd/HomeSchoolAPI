import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <>
            <header id="nav-bar">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <logo class="navbar-brand"><a href="www.peadecode.com" class="logo">Peadecove</a></logo>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"> <Link class="nav-link" to="/">Home</Link></li>
                            <li class="nav-item"> <Link class="nav-link" to="services">Services</Link></li>
                            <li class="nav-item"><Link class="nav-link" to="about">About Us</Link></li>
                            <li class="nav-item"><Link class="nav-link" to="demo">Demo</Link></li>
                            <li class="nav-item"><Link class="nav-link" to="sign-up">Signup</Link></li>
                            <li class="nav-item"><Link class="nav-link" to="contact">Reach Us</Link></li>
                        </ul>
                    </div>
                </nav> 
            </header>
        </>
    );
}
