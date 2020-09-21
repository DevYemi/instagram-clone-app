import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {db, auth } from './components/firebase'
import Header from './components/Header'
import GetModal from './components/Modal';
import Timeline from './components/Timeline';
import Saved from './components/Saved'
import Chat from './components/Chat'
import ProfilePage from './components/ProfilePage'
import {useStateValue} from './components/StateProvider'



function App() {
  const [, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("logIn")
  useEffect(() => {
    db.collection("posts").orderBy("timeStamp", "desc").onSnapshot(snapshot => {
      dispatch({
        type: "SET_POSTS",
        posts: snapshot.docs.map(doc => {return { post: doc.data(), id: doc.id }})
      }
      )
    })
  }, [])
  useEffect(() =>{
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
       if (authUser) {
       dispatch({
         type: "SET_USER",
         user: authUser
       })
       } else {
         dispatch({
           type: "SET_USER",
           user: null
         })
       }
     })
     return () => unsubcribe();
   }, [dispatch])


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/timeline">
            <Header
              setModalOpen={setModalOpen}
              setModalType={setModalType}
            />
            <GetModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalType={modalType}
              setModalType={setModalType}
              
            />

            <Timeline  />
          </Route>
          <Route path="/chat">
            <Header
              setModalOpen={setModalOpen}
              setModalType={setModalType}
            />
            <GetModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalType={modalType}
              setModalType={setModalType}
            />
            <Chat  />
          </Route>
          <Route path="/profile">
            <Header
              
              setModalOpen={setModalOpen}
              setModalType={setModalType}
            />
            <GetModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalType={modalType}
              setModalType={setModalType}
              
            />

            <ProfilePage  />
          </Route>
          <Route path="/saved">
            <Header
              setModalOpen={setModalOpen}
              setModalType={setModalType}
            />
            <GetModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalType={modalType}
              setModalType={setModalType}
            />
            <Timeline  />
          </Route>
          <Route path="/saved">
            <Header
              setModalOpen={setModalOpen}
              setModalType={setModalType}
            />
            <GetModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalType={modalType}
              setModalType={setModalType}
            />

            <Saved  />
          </Route>
          <Route path="/">
            <Header
              
              setModalOpen={setModalOpen}
              setModalType={setModalType}
            />
            <GetModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              modalType={modalType}
              setModalType={setModalType}
            />
            <Timeline  />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
