import React, { useEffect } from 'react'
import { useStateValue } from './StateProvider';
import './cssStyles/profilePost.css'
import Profile from './Profile.js'
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';

function ProfilePosts() {
    const [{ userPosts }] = useStateValue();
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".profilePagepost")
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    })
    useEffect(() => {
        if (!userPosts.length > 0) {
            var postWrapper = document.querySelector(".profilePosts__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin = "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
            console.log("working")
        }
    })
    return (
        <div className="profilePosts">
            <Profile />
            <div className="profilePosts__post">
                {userPosts.length > 0 ?
                    userPosts.map(({ post, id }) => {
                        return (
                            <div key={id} className="profilePosts__gridItem">
                                <img src={post.postImage} alt="post" />
                            </div>
                        )
                    }
                    ) :
                    <>
                        <div className="profilePosts__noPost">
                            < GridOnOutlinedIcon className="profilePosts__noPost_icon" />
                        </div>
                        <div className="profilePosts__noPost_content">
                            <h3>Posts</h3>
                            <p>Upload photos and videos that only you and your followers can see.</p>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default ProfilePosts
