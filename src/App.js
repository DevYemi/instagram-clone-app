import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { getOnlineUserInfo, getFollowers, getFollowing, getTimelinePosts, getUserPosts, getSuggestionOnWhoToFollow, getUserSavedPosts } from './components/get&setDatato&FroDb'
import { auth } from './components/firebase'
import Header from './components/Header'
import Login from './components/Login'
import Timeline from './components/Timeline';
import Footer from './components/Footer'
import ProfileSaved from './components/ProfileSaved'
import Chat from './components/Chat'
import SignUp from './components/SignUp'
import ProfilePosts from './components/ProfilePosts'
import { useStateValue } from './components/StateProvider'
import ProfileIgtv from './components/ProfileIgtv';
import ProfileTagged from './components/ProfileTagged';



function App() {
  const [{ user }, dispatch] = useStateValue(); // current logged in user
  const [refresh, setRefresh] = useState(false); // keeps state if a new user just sign up, refresh the timeline component to get the current logged in user

  useEffect(() => { // gets posts from db and set it to state
    let unsubcribeFollower;
    let unsubcribePosts;
    let unsubcribeTimelinePosts;
    let unsubcribeFollowing;
    let unsubcribeUserSavedPosts;

    if (user) {
      getOnlineUserInfo(user, dispatch);
      getSuggestionOnWhoToFollow(user, dispatch);
      unsubcribeFollower = getFollowers(user, dispatch);
      unsubcribePosts = getUserPosts(user, dispatch);
      unsubcribeUserSavedPosts = getUserSavedPosts(user, dispatch);
      unsubcribeFollowing = getFollowing(user, dispatch);
      unsubcribeTimelinePosts = getTimelinePosts(user, dispatch);
    }

    return () => { if (user) { unsubcribeFollower(); unsubcribeUserSavedPosts(); unsubcribePosts(); unsubcribeFollowing(); unsubcribeTimelinePosts(); } }
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
          {user ? (<Route exact path="/">
            <Header
            />
            <Timeline />
            <Footer />
          </Route>) : (<Route exact path="/">
            <Login />
            <Footer />
          </Route>)}
          <Route path="/login">
            <Login />
            <Footer />
          </Route>

          <Route path="/signup">
            <SignUp setRefresh={setRefresh} />
            <Footer />
          </Route>
          <Route exact path="/profile">
            <Header />
            <ProfilePosts />
            <Footer />
          </Route>
          <Route path="/profile/saved">
            <Header />
            <ProfileSaved />
            <Footer />
          </Route>
          {/* <Route to="/profile/tagged">
            <Header />
            <ProfileTagged />
            <Footer />
          </Route> */}
          {/* <Route exact to="/profile/igtv">
            <Header />
            <ProfileIgtv />
            <Footer />
          </Route> */}
        </Switch>
        <Route path="/chat">
          <Header />
          <Chat />
        </Route>
        <Route exact path="/timeline" >
          <Header />
          <Timeline refresh={refresh} />
          <Footer />
        </Route>
      </div>
    </Router>
  );
}

export default App;
