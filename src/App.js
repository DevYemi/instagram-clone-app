import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import GetModal from './components/Modal';
import Timeline from './components/Timeline';
import Saved from './components/Saved'
import Chat from './components/Chat'
import Profile from './components/Profile'



function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState("logIn")


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/timeline">
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
          </Route>
          <Route path="/chat">
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

            <Chat user={user} />
          </Route>
          <Route path="/profile">
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

            <Profile user={user} />
          </Route>
          <Route path="/saved">
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
          </Route>
          <Route path="/saved">
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

            <Saved user={user} />
          </Route>
          <Route path="/">
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
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
