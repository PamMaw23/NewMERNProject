import {Routes, Route} from 'react-router-dom';
import HomePage from './views/Home';
import RoomPage from './views/Room';
import Header from './components/Header'
import { PeerProvider } from './providers/Peer';
import { SocketProvider } from './providers/Socket';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App roomPage-container">
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
      <Header/>
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
