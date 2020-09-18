import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Post from './components/Post'
import { db } from './components/firebase'
import GetModal from './components/Modal';
import ImageUpload from './components/imageUpload'



function App() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState("logIn")
  useEffect(() => {
    db.collection("posts").orderBy("timeStamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return { post: doc.data(), id: doc.id }
      }));
    })
  }, [])


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


      {posts.length > 0 &&
        posts.map(({ post, id }) => <Post
          key={id}
          avatar={post.avatar}
          postImage={post.postImage}
          userName={post.userName}
          caption={post.caption}
        />)
      }
      {user?.displayName ? <ImageUpload username={user.displayName} />
        : <h3>You nedd to sign in to be able to Upload</h3>}

    </div>
  );
}

export default App;
