import React, {useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { db, auth } from './components/firebase'
import Header from './components/Header'
import Login from './components/Login'
import Timeline from './components/Timeline';
import Footer from './components/Footer'
import Saved from './components/Saved'
import Chat from './components/Chat'
import SignUp from './components/SignUp'
import ProfilePage from './components/ProfilePage'
import { useStateValue } from './components/StateProvider'


function App() {
  const [{ user }, dispatch] = useStateValue();
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    db.collection("posts").orderBy("timeStamp", "desc").onSnapshot(snapshot => {
      dispatch({
        type: "SET_POSTS",
        posts: snapshot.docs.map(doc => { return { post: doc.data(), id: doc.id } })
      }
      )
    })
  }, [dispatch])
  useEffect(() => {
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
          <Route path="/login">
            <Login />
            <Footer />
          </Route>
          <Route path="/timeline">
            <Header
            />
            <Timeline refresh={refresh} />
            <Footer />
          </Route>
          <Route path="/chat">
            <Header
            />
            <Chat />
          </Route>
          <Route path="/profile">
            <Header
            />
            <ProfilePage />
            <Footer />
          </Route>
          <Route path="/signup">
            <SignUp setRefresh={setRefresh} />
            <Footer />
          </Route>
          <Route path="/saved">
            <Header
            />
            <Saved />
            <Footer />
          </Route>
          {user ? (<Route path="/">
            <Header
            />
            <Timeline />
            <Footer />
          </Route>) : (<Route path="/">
            <Login />
            <Footer />
          </Route>) }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
