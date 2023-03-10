import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import { SocketContext } from '../Context';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import Notifications from './Notifications';
import Container from './container/Container';

const useStyles = makeStyles((theme) => ({
    video: {
        width: '350px',
        [theme.breakpoints.down('xs')]: {
            width: '280px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
    },
}));

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    const classes = useStyles();

    return (
        <div className="videoBack">
            <div className="notifications">
                <Sidebar className="notifications">
                    <Notifications />
                </Sidebar>
                {/* <Chat className="notifications" /> */}
            </div>
            <div className="video">
                <Grid container className={classes.gridContainer}>
                    {stream && (
                        <div className="video">
                            <Paper  className={classes.paper}>
                                <Grid item xs={8} md={6} spacing={2}>
                                    <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                                    <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
                                </Grid>
                            </Paper>
                        </div>
                    )}
                    {callAccepted && !callEnded && (
                        <Paper className={classes.paper}>
                            <Grid item xs={8} md={6}>
                                <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                                <video playsInline ref={userVideo} autoPlay className={classes.video} />
                            </Grid>
                        </Paper>
                    )}
                </Grid>
            </div>
            <div className="whiteboard2">
                <div className="notifications">
                    <Chat className="notifications" />
                </div>
                <div className="whiteboard">
                    <Container/>
                </div>
            </div>
        </div>
    );
};
export default VideoPlayer;