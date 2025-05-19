import React, { useEffect, useRef, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { useWebSocket } from './hooks/useWebSocket';
import Navbar from './components/Navbar';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP plugin for React-specific animations
gsap.registerPlugin(useGSAP);

function App() {
  // Refs
  const containerRef = useRef(null);

  // States
  const [messages, setMessages] = useState([]);  // Stores all chat messages
  const [username, setUsername] = useState('');   // Stores the current user's name

  // Handle incoming WebSocket messages
  const handleIncoming = (msg) => {
    setMessages((prev) => [...prev, msg]); // Append new message to the existing list
  };

  // WebSocket custom hook
  const { sendMessage } = useWebSocket(handleIncoming);

  // Handle sending a message
  const handleSend = (text) => {
    const message = {
      sender: username,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    sendMessage(message); // Send the message via WebSocket
  };

  // Handle username input submit
  const handleNameSubmit = (e) => {
    if (e.key === 'Enter') {
      const name = e.target.value.trim();
      if (name) {
        setUsername(name);  // Set the username
        setMessages([
          {
            sender: 'Zypher Bot', // Welcome message from bot
            text: `Hey ${name}! Welcome to the chat.`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      }
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setUsername('');   // Clear username
    setMessages([]);   // Clear chat messages
  };

  // GSAP animations for landing page elements
  useGSAP(() => {
    var t1 = gsap.timeline();
    
    // Animate the logo
    t1.from("#landing", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Animate the username input box
    t1.from("#username", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  // If username is not set, show the landing page
  if (!username) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-zinc-800 overflow-hidden">
        
        {/* Logo Section */}
        <div id="landing" className="mr-8">
          <img src="./zypherlogo.png" alt="Zypher Logo" />
        </div>

        {/* Username input box */}
        <div id='username' className="bg-zinc-700 p-6 rounded-[30px] w-80 text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Enter your name</h2>
          <input
            type="text"
            className="w-full px-[1vw] py-[1vw] border border-white rounded-[30px] mb-4 text-white bg-transparent"
            placeholder="Your name"
            onKeyDown={handleNameSubmit}
          />
        </div>

      </div>
    );
  }

  // If username is set, show the main chat application
  return (
    <div ref={containerRef} className="flex flex-col w-full h-screen overflow-hidden">
      <Navbar username={username} onLogout={handleLogout} />
      <ChatWindow messages={messages} currentUser={username} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default App;
