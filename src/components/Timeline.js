import React, { useState, useEffect } from 'react';
import './cssStyles/Timeline.css';
import Post from './Post'
import { db } from './firebase'
import ImageUpload from './imageUpload'



function Timeline({user}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts").orderBy("timeStamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return { post: doc.data(), id: doc.id }
      }));
    })
  }, [])


  return (
    <div className="timeline">


      {posts.length > 0 &&
        posts.map(({ post, id }) => <Post
          key={id}
          postId={id}
          user={user}
          avatar={post.avatar}
          postImage={post.postImage}
          userName={user?.displayName}
          caption={post.caption}
        />)
      }
      {user?.displayName ? <ImageUpload username={user.displayName} />
        : <h3>You nedd to sign in to be able to Upload</h3>}

    </div>
  );
}

export default Timeline;

