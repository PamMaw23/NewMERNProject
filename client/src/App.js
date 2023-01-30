import {Routes, Route} from 'react-router-dom';
import HomePage from './views/Home';
import RoomPage from './views/Room';
import { PeerProvider } from './providers/Peer';
import { SocketProvider } from './providers/Socket';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Let's Meet</h1>
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/room/:roomId" element={<RoomPage/>}/>
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
