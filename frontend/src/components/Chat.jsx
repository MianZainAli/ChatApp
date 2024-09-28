// src/Chat.js

import React, { useEffect, useState } from 'react';

const Chat = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create WebSocket connection
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
        console.log(socket)
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(socket);

        // Cleanup on component unmount
        return () => {
            socket.close();
        };
    }, [roomName]);

    const sendMessage = () => {
        if (message) {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat Room: {roomName}</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
