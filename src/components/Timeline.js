import React,{useEffect} from 'react';
import './cssStyles/Timeline.css';
import Post from './Post'
import ImageUpload from './imageUpload'
import Sidebar from './Sidebar'
import {useStateValue} from './StateProvider'



function Timeline({refresh}) {
  const [{user, timelinePosts}] = useStateValue(); // current user and user timelinePosts
  console.log(timelinePosts)

 useEffect(() => { // refreshes component if a new user just sign up to get user info
  //  if (refresh) {
  //   window.location.reload();
  //  }

 }, [refresh])

  return (
    <div className="wrapper">
      <div className="timeline">
        <div className="timelineCol1">

          {timelinePosts.length > 0 &&
            timelinePosts.map(({ timelinePosts, id, posterEmail, posterAvi }, index) => <Post
              key={id}
              postId={id}
              posterEmail={posterEmail}
              avatar={posterAvi}
              postImage={timelinePosts?.postImage}
              username={timelinePosts?.username}
              caption={timelinePosts?.caption}
            />)
          }

        </div>
        <div className="timelineCol2">
          <Sidebar/>
        </div>
      </div>
      {user ? <ImageUpload />
        : <h3>You nedd to sign in to be able to Upload</h3>}
    </div>
  );
}

export default React.memo(Timeline);

