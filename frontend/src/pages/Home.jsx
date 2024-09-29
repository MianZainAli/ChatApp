import React, { useState, useEffect } from 'react';
import Chat from '../components/Chat';

const Home = () => {
  const [users, setUsers] = useState([]); // To store users
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user

  useEffect(() => {
    // Fetch the list of users (replace with actual API call)
    fetch('http://127.0.0.1:8001/auth/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  


  console.log('selected user:', selectedUser)
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
            <Chat user={selectedUser}/>
            {/* <h2>Chat with {selectedUser.username}</h2>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <strong>{message.sender}</strong>: {message.content}
                </li>
              ))}
            </ul> */}
          </>
        ) : (
          <p>Select a friend to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
