// src/components/ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

// ChatWindow component to display all chat messages
const ChatWindow = ({ messages, currentUser }) => {
  const bottomRef = useRef(null);     // Ref to scroll to the bottom when new message arrives
  const containerRef = useRef(null);  // Ref for the container (optional use for animations etc.)

  // Scroll to the latest message whenever 'messages' change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 bg-zinc-800 scroll-smooth"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Render each message using MessageBubble */}
      {messages.map((msg, idx) => (
        <MessageBubble
          key={idx}
          sender={msg.sender}
          text={msg.text}
          timestamp={msg.timestamp}
          isMe={msg.sender === currentUser}  // Check if message is sent by current user
        />
      ))}

      {/* Invisible div at the bottom to auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
