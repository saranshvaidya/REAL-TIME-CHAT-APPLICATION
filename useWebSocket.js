// src/hooks/useWebSocket.js
import { useEffect, useRef } from 'react';

export const useWebSocket = (onMessage) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:4000');

    socket.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'chat' && msg.data?.text?.trim()) {
          onMessage(msg.data);
        }
      } catch (err) {
        console.error('Invalid message format', err);
      }
    };

    return () => {
      socket.current.close();
    };
  }, [onMessage]);

  const sendMessage = (data) => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ type: 'chat', data }));
    }
  };

  return { sendMessage };
};
