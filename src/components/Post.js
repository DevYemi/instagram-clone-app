import React, { useState, useEffect } from 'react'
import './cssStyles/post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase'
import firebase from 'firebase'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import TurnedInNotSharpIcon from '@material-ui/icons/TurnedInNotSharp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Post(props) {
    const { postImage, userName = "Anonymous", caption, avatar, postId, user } = props
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState();
    const [likeId, setLikeId] = useState("")

    useEffect(() => {
        let unsubcribeComment;
        let unsubscribeLikes
        if (postId) {
            unsubcribeComment = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                });
            unsubscribeLikes = db
                .collection("posts")
                .doc(postId)
                .collection("totalLikes")
                .onSnapshot(snapshot => {
                    let array = snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }));
                    setTotalLikes(array);
                    array.forEach((totalLike) => {
                        totalLike.data.like === user?.email && setLikeId(totalLike.id);
                    })



                });
        }
        return () => { unsubcribeComment(); unsubscribeLikes(); }
    }, [postId, user])
    useEffect(() => {
        if (totalLikes) {
            console.log(totalLikes)
            for (let i = 0; i < totalLikes.length; i++) {
                const totalLike = totalLikes[i];
                if (totalLike.data.like === user?.email) {
                    setLiked(true);
                    i = totalLikes.length + 1
                } else {
                    setLiked(false);
                }
            }

        }
    }, [totalLikes, user])

    const postComment = (e) => {
        e.preventDefault()
        if (userName === "Anonymous") {
            alert("Please Log In To Be Able To Comment On A Post")
        } else {
            db.collection('posts')
                .doc(postId)
                .collection('comments')
                .add({
                    text: comment,
                    username: user?.displayName || "Anonymous",
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp()
                })
        }
        setComment("");
    }
    const handleLike = (e, eventType) => {
        e.preventDefault();
        switch (eventType) {
            case "ADD":
                if (userName === "Anonymous") {
                    alert("Please Log In To Be Able To Like A Post")
                } else {
                    db.collection('posts')
                        .doc(postId)
                        .collection('totalLikes')
                        .add({ like: user.email });
                    console.log(totalLikes);
                    setLiked(true);
                }

                break;
            case "REMOVE":
                totalLikes.forEach((totalLike) => {
                    console.log(totalLike.data.like === user?.email)
                    totalLike.data.like === user?.email && setLikeId(totalLike.id);
                })
                console.log(likeId)
                if (likeId) {
                    db.collection('posts')
                        .doc(postId)
                        .collection('totalLikes')
                        .doc(likeId)
                        .delete();
                    setLiked(false);
                    setLikeId("");
                }

                break;

            default:
                break;
        }
    }


    return (
        <div className='post'>
            <div className="p__headerContainer">
                <div className="post__header">
                    <Avatar
                        className='post__avatar'
                        alt={userName}
                        src={avatar}
                    />
                    <h3>{userName}</h3>
                </div>
                <MoreHorizIcon />
            </div>

            <img src={postImage} alt="post" className="post__image" />
            <div className="postIcons">
                <div className="postIcons__col1">
                    {liked ? <FavoriteIcon onClick={(e) => handleLike(e, "REMOVE")} style={{ color: red[500] }} className="postIcons" />
                        : <FavoriteBorderOutlinedIcon onClick={(e) => handleLike(e, "ADD")} />}
                    <CommentOutlinedIcon className="postIcons" />
                    <SendOutlinedIcon className="postIcons" />
                </div>
                <div className="postIcon__col2">
                    <TurnedInNotSharpIcon className="postIcons" />
                </div>
            </div>
            {totalLikes && <p className="post__likeFigure">{`${totalLikes?.length} likes`}</p>}
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
                    onChange={(e) => setComment(e.target.value)}
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