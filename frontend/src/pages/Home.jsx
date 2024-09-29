import React, { useState, useEffect } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]); // To store users
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user
  const [messages, setMessages] = useState([]); // To store messages with the selected user

  useEffect(() => {
    // Fetch the list of users (replace with actual API call)
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Fetch messages for the selected user (replace with actual API call)
      fetch(`/api/messages/${selectedUser.id}`)
        .then((response) => response.json())
        .then((data) => setMessages(data));
    }
  }, [selectedUser]);

  return (
    <div className="container">
      <div className="user-list">
        <h2>Friends</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setSelectedUser(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <>
            <h2>Chat with {selectedUser.username}</h2>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <strong>{message.sender}</strong>: {message.content}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Select a friend to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
