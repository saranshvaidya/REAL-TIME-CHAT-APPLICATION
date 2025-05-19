// src/components/MessageInput.jsx
import React, { useState } from "react";

// MessageInput component receives onSend prop function
const MessageInput = ({ onSend }) => {
  // Local state to track input field value
  const [input, setInput] = useState("");

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const trimmed = input.trim(); // Remove extra spaces
    if (!trimmed) return; // Do nothing if input is empty
    onSend(trimmed); // Send the trimmed message
    setInput(""); // Clear the input field
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-zinc-800"
    >
      {/* Input field for typing messages */}
      <input
        type="text"
        className="flex-1 p-[1vw] border border-white rounded-[30px] mr-2 outline-none text-white bg-transparent"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Send button */}
      <button
        type="submit"
        className="bg-zinc-700 text-[1.1vw] cursor-pointer text-white px-[2vw] py-[1vw] rounded-[30px] hover:bg-white hover:text-black transition:easeInQuart duration-400"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
