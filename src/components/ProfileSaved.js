import React, { useEffect } from 'react'
import './cssStyles/profileSaved.css'
import Profile from './Profile.js'
import { useStateValue } from './StateProvider';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';

function ProfileSaved() {
    const [{ userSavedPosts }] = useStateValue();
    console.log(userSavedPosts)
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".profilePagesaved");
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    }) 
    useEffect(()=>{
        if (!userSavedPosts.length > 0 || userSavedPosts.length === 1) {
            var postWrapper = document.querySelector(".profileSaved__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin= "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
        }
    })
    return (
        <div className="profileSaved">
            <Profile />
            <div className="profileSaved__post">
                {userSavedPosts.length > 0 ? 
                    userSavedPosts.map(({ savedPost, id }) => {
                        return (
                            <div key={id} className="profileSaved__gridItem">
                                <img src={savedPost.postImage} alt="post" />
                            </div>
                        )
                    }
                    )
                :
                <>
                 <div className="profileSaved__noPost">
                 < BookmarkBorderSharpIcon className="profileSaved__noPost_icon" />
                </div>
                <div className="profileSaved__noPost_content">
                    <h3>Save</h3>
                    <p>Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved</p>
                </div> 
                </>
                }
            </div>
        </div>
    )
}

export default ProfileSaved
