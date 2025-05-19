// src/components/MessageBubble.jsx
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// MessageBubble component to display each individual chat message
const MessageBubble = ({ sender, text, timestamp, isMe }) => {
  const isBot = sender === 'Zypher Bot'; // Check if the sender is the bot

  // Animate the message bubble when it appears
  useGSAP(() => {
    gsap.from("#bubble", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div 
      className={`flex ${
        isBot ? 'justify-center' : isMe ? 'justify-end' : 'justify-start'
      } mb-2`}
    >
      <div className="max-w-xs break-words">
        {/* Display username on top of the message bubble (except for bot messages) */}
        {!isBot && (
          <div
            className={`text-xs font-semibold mb-1 ${
              isMe ? 'text-right text-white' : 'text-left text-gray-300'
            }`}
          >
            {sender}
          </div>
        )}

        {/* Actual message bubble */}
        <div
          className={`p-3 rounded-xl shadow-md ${
            isBot
              ? 'bg-yellow-200 text-black text-center' // Bot messages styling
              : isMe
              ? 'bg-[#0084FF] text-white rounded-br-none' // Current user messages styling
              : 'bg-zinc-700 text-white rounded-bl-none' // Other user messages styling
          }`}
        >
          {/* Message text */}
          <div>{text}</div>

          {/* Timestamp aligned to bottom-right */}
          <div className="text-xs text-right mt-1 opacity-70">{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
