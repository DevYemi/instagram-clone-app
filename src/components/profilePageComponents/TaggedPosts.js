import React, { useEffect } from 'react'
import '../cssStyles/taggedPosts.css'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

function TaggedPosts({ userPosts }) {
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".UserTagged");
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    })
    useEffect(() => {
        if (userPosts) {
            var postWrapper = document.querySelector(".taggedPosts__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin = "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
        }
    })
    return (

        <div className="taggedPosts__post">
            <div className="taggedPosts__noPost">
                < AccountBoxOutlinedIcon className="taggedPosts__noPost_icon" />
            </div>
            <div className="taggedPosts__noPost_content">
                <h3>Tagged</h3>
                <p>You haven't been tagged to any of your followers photos and videos yet. </p>
            </div>
            {/* {userPosts.length > 0 &&
                    userPosts.map(({ post, id }) => {
                        return (
                            <div key={id} className="taggedPosts__gridItem">
                                <img src={post.postImage} alt="post" />
                            </div>
                        )
                    }
                    )
                } */}
        </div>
    )
}

export default TaggedPosts
