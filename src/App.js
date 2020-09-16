import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Post from './components/Post'
import {db} from './components/firebase'

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
   db.collection("posts").onSnapshot(snapshot =>{
     setPosts(snapshot.docs.map(doc => {
       return {post: doc.data(), id: doc.id}
     }));
   })
  },[])
  return (
    <div className="app">
      <Header />
      {posts.length > 0 &&
        posts.map(({post, id}) => <Post
          key={id}
          avatar={post.avatar}
          postImage={post.postImage}
          userName={post.userName}
          caption={post.caption}
        />)
      }

    </div>
  );
}

export default App;
