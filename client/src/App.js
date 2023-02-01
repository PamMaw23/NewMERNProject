import {Routes, Route} from 'react-router-dom';
import HomePage from './views/Home';
import RoomPage from './views/Room';
import LoginForm from './views/LoginForm';
import RegForm from './views/RegForm';
import { PeerProvider } from './providers/Peer';
import { SocketProvider } from './providers/Socket';
import { useState } from 'react';

import './App.css';

function App() {
  const [log , setLog] = useState("");

  return (
    <div className="App">
      <h1>Let's Meet</h1>
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/room/:roomId" element={<RoomPage/>}/>
            <Route path='/login' element={<LoginForm setLogged/>}/>
            <Route path="/register" element={<RegForm/>}/>

          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
