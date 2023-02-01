import React from 'react';
import { Typography, AppBar } from "@mui/material";
import HomePage from './views/HomePage';
import { makeStyles } from "tss-react/mui";
import {Routes, Route} from "react-router-dom";
import VideoPlayer from './components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import "./App.css";

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
    <div className='.roomPage-container'>
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
        {/* <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center">Header</Typography>
        </AppBar> */}
        <Header />
        <HomePage />
        {/* <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center">Footer</Typography>
        </AppBar> */}
      </div>
      <Routes>
        <Route element={VideoPlayer} path="/start/meeting"/>
        {/* <Route element={LoginReg} path="/create/profile"/>
        <Route element={ProfilePage} path="/view/profile"/> */}
      </Routes>
    </div>
  );
};

export default App;