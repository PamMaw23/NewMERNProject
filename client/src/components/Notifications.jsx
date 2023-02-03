import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { SocketContext } from '../Context';
// import {useDropzone} from 'react-dropzone';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
    <div className="notifications thisOne ">
        {call.isReceivingCall && !callAccepted && (
            <div  className="thisOne"style={{ display: 'flex', justifyContent: 'space-around' }}>
                <h1>{call.name} is calling:</h1>
                <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
                </Button>
                <button> Answer</button>
            </div>
        )}
    </div>
    );
};

export default Notifications;