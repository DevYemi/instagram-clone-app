import React, { useState, useEffect } from 'react'
import './cssStyles/post.css'
import { getCommentsFromDb, getLikesFromDb, getSavedFromDb, setCommentToDb, setLikesToDb, setSavedPostsToDb } from './get&setDatato&FroDb'
import Avatar from '@material-ui/core/Avatar'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import TurnedInNotSharpIcon from '@material-ui/icons/TurnedInNotSharp';
import TurnedInSharpIcon from '@material-ui/icons/TurnedInSharp';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useStateValue } from './StateProvider'

function Post(props) {
    const { postImage, username, caption, avatar, postId, posterEmail } = props
    const [{ user }] = useStateValue(); // current logged in user
    const [comments, setComments] = useState([]); // total comment from the db
    const [comment, setComment] = useState(""); // current inputed comment by user
    const [liked, setLiked] = useState(false); // keep state if a post is liked by current logged in user
    const [totalLikes, setTotalLikes] = useState(); // keep state on total like on a post
    const [likeId, setLikeId] = useState(""); // keep state of the id of the user that like a post so it can later be deleted in the db
    const [saved, setSaved] = useState(false); // keep state if a post has been saved by current logged in user
    const [savedId, setSavedId] = useState(""); // keep state of the id of the user that save a post so it can later be deleted in the db
    const [totalSaved, setTotalSaved] = useState(); // keep state on total user that has ever saved the post
    useEffect(() => { //gets comments and likes from db
        let unsubcribeComment;
        let unsubscribeLikes
        if (postId) {
            unsubcribeComment = getCommentsFromDb(posterEmail, postId, setComments) // gets all the comment on a particular post
            unsubscribeLikes = getLikesFromDb(posterEmail, postId, setTotalLikes, user, setLikeId) // gets all the like on a particular post
            unsubscribeLikes = getSavedFromDb(posterEmail, postId, setTotalSaved, user, setSavedId) // gets all the saved user that ever saved a particuar posts
        }
        return () => { unsubcribeComment(); unsubscribeLikes(); }
    }, [postId, user, posterEmail])
    useEffect(() => { // checks if current logged in user as previously liked or saved the post
        if (totalLikes) {
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
        if (totalSaved) {
            for (let i = 0; i < totalSaved.length; i++) {
                const saved = totalSaved[i];
                if (saved.data.savedBy === user?.email) {
                    setSaved(true);
                    i = totalSaved.length + 1
                } else {
                    setSaved(false);
                }
            }

        }
    }, [totalLikes, user, totalSaved])

    const postComment = (e) => { // post comment to db
        e.preventDefault()
        if (!user) {
            alert("Please Log In To Be Able To Comment On A Post")
        } else {
            setCommentToDb(posterEmail, postId, user, comment)
        }
        setComment("");
    }
    const handleLike = (e, eventType) => { // add and remove like from db
        e.preventDefault();
        setLikesToDb(eventType, user, posterEmail, postId, totalLikes, likeId, setLiked, setLikeId)
    }
    const handleSavedPosts = (e, eventType) => { // add and remove saved post from db
        e.preventDefault();
        setSavedPostsToDb(eventType, user, posterEmail, postId, totalSaved, savedId, setSaved, setSavedId,postImage)
    }


    return (
        <div className='post'>
            <div className="p__headerContainer">
                <div className="post__header">
                    <Avatar
                        className='post__avatar'
                        alt={username}
                        src={avatar}
                    />
                    <h3>{username}</h3>
                </div>
                <MoreHorizIcon />
            </div>

            <img src={postImage} alt="post" className="post__image" />
            <div className="postIcons">
                <div className="postIcons__col1">
                    {liked ? <FavoriteIcon onClick={(e) => handleLike(e, "REMOVE")} style={{ color: red[500] }} className="postIcons" />
                        : <FavoriteBorderOutlinedIcon onClick={(e) => handleLike(e, "ADD")} />
                    }
                    <CommentOutlinedIcon className="postIcons" />
                    <SendOutlinedIcon className="postIcons" />
                </div>
                <div className="postIcon__col2">
                    {saved ? <TurnedInSharpIcon onClick={(e) => handleSavedPosts(e, "REMOVE")} className="postIcons" />
                        : <TurnedInNotSharpIcon onClick={(e) => handleSavedPosts(e, "ADD")} className="postIcons" />
                    }
                </div>
            </div>
            {totalLikes && <p className="post__likeFigure">{`${totalLikes?.length} likes`}</p>}
            <h4 className="post__text"><strong>  {username}</strong>{` ${caption}`}</h4>
            <div className="post__comments">
                {comments.map((comment, index) =>
                    (<p key={index}>
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