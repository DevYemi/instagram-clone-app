import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {getOnlineUserInfo, getFollowers, getFollowing, getTimelinePosts, getUserPosts, getSuggestionOnWhoToFollow} from './components/get&setDatato&FroDb'
import { auth } from './components/firebase'
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
  const [{user}, dispatch] = useStateValue(); // current logged in user
  const [refresh, setRefresh] = useState(false); // keeps state if a new user just sign up, refresh the timeline component to get the current logged in user

  useEffect(() => { // gets posts from db and set it to state
    let unsubcribeFollower;
    let unsubcribePosts;
    let unsubcribeTimelinePosts;
    let unsubcribeFollowing;

    if (user) {
      getOnlineUserInfo(user, dispatch);
      getSuggestionOnWhoToFollow(user, dispatch);
      unsubcribeFollower = getFollowers(user, dispatch);
      unsubcribePosts = getUserPosts(user, dispatch);
      unsubcribeFollowing = getFollowing(user, dispatch);
      unsubcribeTimelinePosts = getTimelinePosts(user, dispatch);
    } 

    return () => { if (user) { unsubcribeFollower(); unsubcribePosts(); unsubcribeFollowing(); unsubcribeTimelinePosts();} }
  }, [dispatch, user])
  useEffect(() => { // event listener if there a change in the current user (logIn & signOut)
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
          </Route>)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
