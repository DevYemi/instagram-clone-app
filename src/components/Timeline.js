import React,{useEffect} from 'react';
import './cssStyles/Timeline.css';
import Post from './Post'
import ImageUpload from './imageUpload'
import Sidebar from './Sidebar'
import {useStateValue} from './StateProvider'



function Timeline({refresh}) {
  const [{user, posts}] = useStateValue();
  console.log( user);
 useEffect(() => {
   if (refresh) {
    window.location.reload();
   }

 }, [refresh])

  return (
    <div className="wrapper">
      <div className="timeline">
        <div className="timelineCol1">

          {posts.length > 0 &&
            posts.map(({ post, id }) => <Post
              key={id}
              postId={id}
              avatar={post.avatar}
              postImage={post.postImage}
              userName={user?.displayName}
              caption={post.caption}
            />)
          }

        </div>
        <div className="timelineCol2">
          <Sidebar/>
        </div>
      </div>
      {user?.displayName ? <ImageUpload username={user.displayName} />
        : <h3>You nedd to sign in to be able to Upload</h3>}
    </div>
  );
}

export default React.memo(Timeline);

