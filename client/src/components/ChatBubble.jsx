import React from 'react';


const ChatBubble = ({ name, message }) => (
    <div className="chat-bubble-container">
        <p className="chat-bubble-name">{name}:</p>
        <div className="chat-bubble">{message}</div>
    </div>
);

export default ChatBubble;