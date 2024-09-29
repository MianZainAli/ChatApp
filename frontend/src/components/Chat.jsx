// src/Chat.js

import React, { useEffect, useState } from 'react';


const Chat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user) {
            const accessToken = localStorage.getItem('access_token')
          // Fetch messages for the selected user (replace with actual API call)
            fetch(`http://127.0.0.1:8001/m/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
            })
            .then((response) => response.json())
            .then((data) => setMessages(data));

            console.log('messages',messages)
        }
      }, [user]);
    

    useEffect(() => {
        // Create WebSocket connection
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${user.username}/`);
        console.log(socket)

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data)
            setMessages((prevMessages) => [...prevMessages, data]);
            
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event.code, event.reason);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        

        setSocket(socket);

        return () => {
            socket.close();
        };
    }, [user]);

    const sendMessage = () => {
        if (message && socket) {

            const messageData = { content: message, receiver:user.id}
            socket.send(JSON.stringify( messageData ));

            const accessToken = localStorage.getItem('access_token')

            fetch('http://127.0.0.1:8001/m/save/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    receiver: user.id,        // Receiver info (selected user)
                    content: message,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Message saved to backend:', data);
            })
            .catch(error => {
                console.error('Error saving message:', error);
            });

            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat with {user.username}</h2>
            <div>
                {messages.map((message, index) => (
                    <li key={index}>
                    <strong></strong>{message.content}
                    </li>
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
