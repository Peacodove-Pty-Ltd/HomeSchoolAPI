import React from "react";
import { hot } from "react-hot-loader";
import Footer from './pages/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Services from './pages/Services';
import SignUp from './pages/SignUp';
import Cover from './pages/Cover';

const HelloWorld = () => {
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
};

export default hot(module)(HelloWorld);
