import React, { useState, useEffect } from 'react';
import './style.scss';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket']
});
  
socket.on('onlineUsers', (onlineUsers) => {
  console.log('onlineUsers: ', onlineUsers);
});
  
socket.on("connect_error", (err) => {
  console.log(`connect_error due to dededed ${err.message}`);
});

socket.on("connect", () => {
  console.log("socket connected");
});

socket.on("disconnect", () => {
  console.log("socket disconnected");
});
  

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    console.log('Component has mounted');
  }, []);

  useEffect(() => {
    socket.on('onlineUsers', (data) => {
      console.log('francys socket onlineUsers: ', data);
      setOnlineUsers(data);
    });
  }, [onlineUsers]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('francys socket.on front: ', data);
      setMessages([...messages, data]);
    });
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('message', newMessage);
    console.log('francys front: ', newMessage);
    setNewMessage('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', second:'2-digit'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
  <div className="container clearfix">
    <div className="people-list" id="people-list">
      <div className="search">
        <input type="text" placeholder="search" />
        <i className="fa fa-search"></i>
      </div>
      <ul className="list">
        {onlineUsers.map((onlineUser, index) => (
          <li className="clearfix" key={index}>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
            <div className="about">
              <div className="name">{onlineUser.username}</div> 
              <div className="status">
                <i className="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
        ))} 
      </ul>
    </div>
    
    <div className="chat">
      <div className="chat-header clearfix">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
        
        <div className="chat-about">
          <div className="chat-with">Chat with Francys</div>
        </div>
        <i className="fa fa-star"></i>
      </div>
      
      <div className="chat-history">
        <ul>
          
        {messages.map((msg, index) => (
          <li key={index}>
            <div className="message-data align-right">
              <span className="message-data-name"><i className="fa fa-circle online"></i> Me</span>
              <span className="message-data-time">{formatDate(msg.date)}</span>
            </div>
            <div ref={messagesEndRef} className="message other-message float-right align-left">
            {msg.message}
            </div>
          </li>
        ))} 
        </ul>
        
      </div>
      
      <div className="chat-message clearfix">
        <textarea name="message-to-send" placeholder ="Type your message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows="3"></textarea>
                
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        
        <button onClick={sendMessage}>Send</button>

      </div>
      
    </div>
    
  </div>



  );
};

export default Chat;