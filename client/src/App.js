import { useState} from 'react';
import React from 'react';
import HomePage from './views/HomePage';
import ViewProfile from './views/ViewProfile';
import LoginForm from './views/LoginForm';
import RegForm from './views/RegForm';
import { makeStyles } from "tss-react/mui";
import {Routes, Route} from "react-router-dom";
import VideoPlayer from './components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import "./App.css";
import {useNavigate} from 'react-router-dom';
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, } from 'react';
import UserContext from "./Context/UserContext";



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
  const [storeUser, setStoreUser] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  const alanBtnRef = useRef({}).current;

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem("storeUser"))
    setStoreUser(loggedUser)
    const alanKey = '3f79885a4b3f4fdfea6b1dda3896958e2e956eca572e1d8b807a3e2338fdd0dc/stage'
    alanBtn({
      key: alanKey,
      onCommand: (commandData) => {
        if (commandData.command === 'goBack') {
          // something to happen
          alert("Go back to the home page?");
          navigate("/");
        }else if (commandData.command === 'startMeeting'){
          // else if (commandData.command === 'signUp'){
          // alert("Going to sign up page");
          navigate("/start/meeting");
        }else if (commandData.command === 'enterMeeting'){
          // alert("Entering a new meeting");
          navigate("/start/meeting");
        }else if (commandData.command === 'signUp'){
          // alert("Going to sign up page");
          navigate("/register");
        }else if (commandData.command === 'login'){
          // alert("Going to sign up page");
          navigate("/login");
        }
      },
    });
  }, [navigate]);

  return (
    <div className='roomPage-container'>
      <UserContext.Provider value={{storeUser, setStoreUser}}>
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
          <Route element={<ViewProfile/>} path="/view/profile/:id" />
        </Routes>
        {/* <button onClick={() => {
          alanBtnRef.btnInstance.callProjectApi("setClientData", {value:"your data"}, function (error, result){
            // handle error and result here
          });
          alanBtnRef.btnInstance.playText("Hi there, I am Alan");
          alanBtnRef.btnInstance.sendText("Hello Alan, can you help me?");
          alanBtnRef.btnInstance.playCommand({command: "goBack"});
        }}></button> */}
      </UserContext.Provider>
    </div>
  );
};

export default App;