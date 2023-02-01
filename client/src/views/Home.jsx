import { useSocket } from "../providers/Socket";
import {useNavigate} from 'react-router-dom';
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';



const HomePage= (props)=>{
    const {socket} = useSocket();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [roomId, setRoomId] = useState();

    const handleRoomJoined = useCallback(({roomId})=>{
        navigate(`/room/${roomId}`);
    }, [navigate]);

    useEffect(()=>{
        socket.on('joined-room', handleRoomJoined);
        return() => {
            socket.off('joined-room', handleRoomJoined)
        }
    }, [handleRoomJoined, socket]);

    const handleJoinRoom = ()=>{
        socket.emit('join-room', {emailId: email, roomId});

    }
    const logoutHandler = (e)=>{
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
        .then(res=>{
            navigate("/login")

        })
        .catch(err=>{console.log(err.response)})

    }
    return(
        <div className='homePage-container'>
            <div className="input-container">
            <button onClick={logoutHandler}>Logout</button>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email here"/>
                <input value={roomId} onChange={(e)=>setRoomId(e.target.value)} type="text" placeholder="Enter Meeting Code"/>
                <button onClick={handleJoinRoom}>Enter Meeting Room</button>
            </div>
        </div>
    )

}

export default HomePage;