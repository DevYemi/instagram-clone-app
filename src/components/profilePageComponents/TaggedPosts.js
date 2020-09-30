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
        var postWrapper = document.querySelector(".taggedPosts__post");
        if (!userPosts?.length > 0 || userPosts?.length === 1) {
            postWrapper.classList.add("noPosts")
        } else {
            postWrapper.classList.remove("noPosts")
        }
    })
    return (

        <div className="taggedPosts__post noPosts">
            {userPosts?.length > 0 ?
                userPosts.map(({ post, id }) => {
                    return (
                        <div key={id} className="taggedPosts__gridItem">
                            <img src={post.postImage} alt="post" />
                        </div>
                    )
                }
                ) :
                <>
                    <div className="taggedPosts__noPost">
                        < AccountBoxOutlinedIcon className="taggedPosts__noPost_icon" />
                    </div>
                    <div className="taggedPosts__noPost_content">
                        <h3>Tagged</h3>
                        <p>You haven't been tagged to any of your followers photos and videos yet. </p>
                    </div>
                </>
            }

        </div>
    )
}

export default TaggedPosts
