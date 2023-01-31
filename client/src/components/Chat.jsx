import io from 'socket.io-client';
import {useEffect, useState} from 'react';

const socket = io.connect("http://localhost:8001");

const Chat = (props) => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [name, setName] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage=()=>{
        socket.emit("send-message",{message, name});
        setMessages([...messages, {message, name}]);
        setMessage("");
      };

      useEffect(()=>{
        socket.on("receive-message", (data)=>{
          setMessages([...messages, data]);
        })
      }, [socket, messages]);

    return(
        <div>
            <input placeholder="Name..." value={name} onChange={(event)=>{
            setName(event.target.value);
            }}/>
            <input placeholder="Message..." value={message} onChange={(event)=>{
            setMessage(event.target.value);
            }}/>
            <button onClick={sendMessage}>Send Message</button>
            <h1>Messages:</h1>
            {messages.map((message, index) => (
            <p key={index}>{message.name}: {message.message}</p>
            ))}
        </div>
    )

}

export default Chat;
