import React, { useEffect } from 'react'
import '../cssStyles/uploadedPosts.css'
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';

function UploadedPosts({ userPosts }) {
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".UserPost")
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    })
    useEffect(() => {
        var postWrapper = document.querySelector(".uploadedPosts__post");
        if (!userPosts?.length > 0 || userPosts?.length === 1) {
            postWrapper.classList.add("noPosts")
            console.log("working")
        } else {
            postWrapper.classList.remove("noPosts")
        }
    },[userPosts])
    return (
        <div className="uploadedPosts__post noPosts">
            {userPosts?.length > 0 ?
                userPosts.map(({ post, id }) => {
                    return (
                        <div key={id} className="uploadedPosts__gridItem">
                            <img src={post.postImage} alt="post" />
                        </div>
                    )
                }
                ) :
                <>
                    <div className="uploadedPosts__noPost">
                        < GridOnOutlinedIcon className="uploadedPosts__noPost_icon" />
                    </div>
                    <div className="uploadedPosts__noPost_content">
                        <h3>Posts</h3>
                        <p>Upload photos and videos that only you and your followers can see.</p>
                    </div>
                </>
            }

        </div>

    )
}

export default UploadedPosts
