import React, { useEffect } from 'react'
import '../cssStyles/igtvPosts.css'
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';

function IgtvPosts({ userPosts }) {

    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".UserIgtv")
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    })
    useEffect(() => {
        var postWrapper = document.querySelector(".igtvPosts__post");
        if (!userPosts?.length > 0 || userPosts?.length === 1) {
            postWrapper.classList.add("noPosts")
        } else {
            postWrapper.classList.remove("noPosts")
        }
    }, [userPosts])
    return (
        <div className="igtvPosts__post noPosts">
            {userPosts?.length > 0 ?
                userPosts.map(({ post, id }) => {
                    return (
                        <div key={id} className="igtvPosts__gridItem">
                            <img src={post.postImage} alt="post" />
                        </div>
                    )
                }
                ) :
                <>
                    <div className="igtvPosts__noPost">
                        < LiveTvOutlinedIcon className="igtvPosts__noPost_icon" />
                    </div>
                    <div className="igtvPosts__noPost_content">
                        <h3>Upload a Video</h3>
                        <p>Videos must be between 1 and 60 minutes long.</p>
                    </div>
                </>
            }

        </div>
    )
}

export default IgtvPosts
