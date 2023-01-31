import {useSocket} from "../providers/Socket";
import {useEffect, useCallback, useState} from 'react';
import Chat from '../components/Chat';
import ReactPlayer from 'react-player';
import { usePeer } from "../providers/Peer";

const RoomPage = ()=>{
    const{socket} = useSocket();
    const {peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream} = usePeer();
    const [myStream, setMyStream] = useState(null);
    // const [remoteStream, setRemoteStream] = useState();
    const [remoteEmailId, setRemoteEmailId]=useState();


    const handleNewUserJoined = useCallback(async (data)=>{
        const{emailId}= data;
        console.log('New user joined room', emailId);
        const offer = await createOffer();
        socket.emit('call-user', {emailId, offer});
        setRemoteEmailId(emailId)
    }, [createOffer, socket]);

    // const handleIncomingCall = useCallback( async(data)=>{
    //     const{ from, offer } = data;
    //     console.log('Incoming call from', from, offer);
    //     const ans = await createAnswer(offer)
    //     .then(()=>{
    //          socket.emit('call-accepted', {emailId: from, ans});
    //     setRemoteEmailId(from)
    //     })
       
    // }, [createAnswer, socket]);

    const handleIncomingCall = useCallback( async(data)=>{
        const{ from, offer } = data;
        console.log('Incoming call from', from, offer);
        let ans;
        ans = await createAnswer(offer)
        .then(()=>{
        socket.emit('call-accepted', {emailId: from, ans});
        setRemoteEmailId(from)
        })
        
        }, [createAnswer, socket]);

    const handleCallAccepted = useCallback(async (data)=>{
        const {ans}= data;
        console.log('This call was accepted', ans);
        await setRemoteAnswer(ans);
    }, [setRemoteAnswer]);

    const getUserMediaStream = useCallback(async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true, 
            video:true,
        });
        sendStream(stream);
        setMyStream(stream);
    },[sendStream]);

    const handleNegotiation = useCallback(()=>{
        const localOffer = peer.localDescription;
        socket.emit('call-user', {emailId: remoteEmailId, offer:localOffer})
    }, [peer.localDescription, remoteEmailId, socket]);

    useEffect(()=>{
        socket.on('user-joined', handleNewUserJoined );
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted);

        // return ()=>{
        //     socket.off('user-joined', handleNewUserJoined);
        //     socket.off('incoming-call', handleIncomingCall);
        //     socket.off('call-accepted', handleCallAccepted);
        // };
    }, [handleCallAccepted, handleIncomingCall, handleNewUserJoined, socket]);

    useEffect(()=>{
        peer.addEventListener('negotiationneeded', handleNegotiation);
        return()=>{
            peer.removeEventListener('negotiationneeded', handleNegotiation);
        }
    },[handleNegotiation, peer])

    useEffect(()=>{
        getUserMediaStream();
    }, [getUserMediaStream]);
    

    return(
        <div className='roomPage-container'>
            <span className='bub a'></span>
            <span className='bub b'></span>
            <span className='bub c'></span>
            <span className='bub d'></span>
            <span className='bub e'></span>
            <span className='bub f'></span>
            <span className='bub g'></span>
            <span className='bub h'></span>
            <span className='bub i'></span>
            <span className='bub j'></span>
            <div className="vid-container">
                <h1 className='side'>Room Page</h1>
                <h4 className='side'>You are connected to {remoteEmailId}</h4>
                <button className='side' onClick={(e)=> sendStream(myStream)} >Send My Video</button>
                <ReactPlayer url={myStream} playing muted/>
                <ReactPlayer url={remoteStream} playing muted/>
                <Chat />
            </div>
            
        </div>
    )
}

export default RoomPage;