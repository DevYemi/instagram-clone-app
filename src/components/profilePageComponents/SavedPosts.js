import React, { useEffect } from 'react'
import '../cssStyles/savedPosts.css'
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';

function SavedPosts({userSavedPosts}) {
    console.log(userSavedPosts)
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".UserSaved");
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    }) 
    useEffect(()=>{
        if (!userSavedPosts.length > 0 || userSavedPosts.length === 1) {
            var postWrapper = document.querySelector(".savedPosts__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin= "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
        }
    })
    return (
            <div className="savedPosts__post">
                {userSavedPosts.length > 0 ? 
                    userSavedPosts.map(({ savedPost, id }) => {
                        return (
                            <div key={id} className="savedPosts__gridItem">
                                <img src={savedPost.postImage} alt="post" />
                            </div>
                        )
                    }
                    )
                :
                <>
                 <div className="savedPosts__noPost">
                 < BookmarkBorderSharpIcon className="savedPosts__noPost_icon" />
                </div>
                <div className="savedPosts__noPost_content">
                    <h3>Save</h3>
                    <p>Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved</p>
                </div> 
                </>
                }
            </div>
    )
}

export default SavedPosts
