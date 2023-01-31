import React from 'react';
import { Typography, AppBar } from "@mui/material";
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
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
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Header</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Footer</Typography>
      </AppBar>
    </div>
  );
};

export default App;