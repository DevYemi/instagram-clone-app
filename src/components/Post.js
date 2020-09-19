import React,{useState, useEffect} from 'react'
import './cssStyles/post.css'
import Avatar from '@material-ui/core/Avatar'
import {db} from './firebase'
import firebase from 'firebase'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import TurnedInNotSharpIcon from '@material-ui/icons/TurnedInNotSharp';

function Post(props) {
    const { postImage, userName = "Anonymous", caption, avatar, postId, user } = props
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("")

    useEffect(()=>{
      let unsubcribe;
      if (postId) {
          unsubcribe = db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .onSnapshot(snapshot => {
              setComments(snapshot.docs.map(doc => doc.data()))
              console.log(snapshot)
          })
      }
      return () => { unsubcribe()}
    }, [postId])

    const postComment = (e) =>{
        e.preventDefault()
        db.collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
            text: comment,
            username: user?.displayName || "Anonymous",
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      setComment("");
    }


    return (
        <div className='post'>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt={userName}
                    src={avatar}
                />
                <h3>{userName}</h3>

            </div>

            <img src={postImage} alt="post" className="post__image" />
            <div className="postIcons">
                <div className="postIcons__col1">
                 <FavoriteBorderOutlinedIcon className="postIcons" />
                 <CommentOutlinedIcon className="postIcons" />
                 <SendOutlinedIcon className="postIcons" />
                </div>
                <div className="postIcon__col2">
                    <TurnedInNotSharpIcon className="postIcons" />
                </div>
            </div>
            <h4 className="post__text"><strong>  {userName}</strong>{` ${caption}`}</h4>
            <div className="post__comments">
                {comments.map(comment => 
                    (<p>
                        <strong>{comment.username}</strong>  {comment.text}
                    </p>)
                )

                }
            </div>
            <form className="post__commentBox">
                <input
                 type="text" name="comment"
                  className="post__commentInput"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e)=> setComment(e.target.value)}
                  />
                  <button 
                  type="submit"
                  className='post__CommentSubmit'
                  disabled={!comment}
                  onClick={postComment}
                  >Post</button>
            </form>
        </div>
    )
}

export default Post