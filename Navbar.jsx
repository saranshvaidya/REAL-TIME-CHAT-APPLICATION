// src/components/Navbar.jsx
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

// Navbar component
const Navbar = ({ username, onLogout }) => {

  // GSAP animation for logo and text when Navbar mounts
  useGSAP(() => {
    var t2 = gsap.timeline();

    // Animate the logo
    t2.from("#logo", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Animate the username and logout button
    t2.from("#text", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div id="nav" className="bg-zinc-800 text-white px-[0.5vw] py-0 flex justify-between items-center shadow-md w-full">
      
      {/* Logo section */}
      <div className="w-[6vw]" id="logo">
        <img src="./zypherlogo.png" alt="Zypher Logo" />
      </div>

      {/* Username and Logout button section */}
      <div id="text" className="flex items-center space-x-4">
        <span className="text-lg">
          {username ? `Hello, ${username}` : 'Welcome!'}
        </span>

        {/* Logout button, visible only if username is set */}
        {username && (
          <button 
            onClick={onLogout}
            className="bg-zinc-700 cursor-pointer text-white px-[1.2vw] py-[0.8vw] rounded-[30px] hover:bg-white hover:text-black transition:easeInQuart duration-400"
          >
            Logout
          </button>
        )}
      </div>
      
    </div>
  );
};

export default Navbar;
