import React, {useState} from 'react';
import './App.css';
import Header from './components/Header'
import GetModal from './components/Modal';
import Timeline from './components/Timeline';



function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState("logIn")


  return (
    <div className="app">
      <Header
        user={user}
        setModalOpen={setModalOpen}
        setModalType={setModalType}
      />
      <GetModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalType={modalType}
        setModalType={setModalType}
        user={user}
        setUser={setUser}
      />

       <Timeline user={user} />

    </div>
  );
}

export default App;
