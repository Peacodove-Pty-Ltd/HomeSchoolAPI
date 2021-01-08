import React from 'react';
// import '../../App.css';
import Footer from '../Footer';
import About from './About';
import Contact from './Contact';
import Demo from './Demo';
import Services from './Services';
import SignUp from './SignUp';
import Cover from './Cover';

function Home() {
    return (
        <>
            <Cover />
            <Services />
            <Demo />
            <About />
            <SignUp />
            <Contact />
            <Footer />
        </>
    );
}

export default Home;
