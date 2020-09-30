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
        if (userPosts) {
            var postWrapper = document.querySelector(".igtvPosts__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin = "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
        }
    })
    return (
            <div className="igtvPosts__post">
                <div className="igtvPosts__noPost">
                    < LiveTvOutlinedIcon className="igtvPosts__noPost_icon" />
                </div>
                <div className="igtvPosts__noPost_content">
                    <h3>Upload a Video</h3>
                    <p>Videos must be between 1 and 60 minutes long.</p>
                </div>
                {/* {userPosts.length > 0 &&
                    userPosts.map(({ post, id }) => {
                        return (
                            <div key={id} className="igtvPosts__gridItem">
                                <img src={post.postImage} alt="post" />
                            </div>
                        )
                    }
                    )
                } */}
            </div>
    )
}

export default IgtvPosts
