import { useState } from 'react';
import React from 'react';
import HomePage from './views/HomePage';
import ProfilePage from './components/ProfilePage';
import LoginForm from './views/LoginForm';
import RegForm from './views/RegForm';
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
  const [log , setLog] = useState("");

  return (
    <div className='roomPage-container'>
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
        <Header />
      </div>
      <Routes>
        <Route element={<HomePage/>} path="/"/>
        <Route element={<VideoPlayer/>} path="/start/meeting"/>
        <Route path='/login' element={<LoginForm setLogged/>}/>
        <Route path="/register" element={<RegForm/>}/>
        <Route element={ProfilePage} path="/view/profile"/>
      </Routes>
    </div>
  );
};

export default App;