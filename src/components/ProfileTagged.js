import React, { useEffect } from 'react'
import Profile from './Profile';
import './cssStyles/profileTagged.css'
import { useStateValue } from './StateProvider';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

function ProfileTagged() {
    const [{ userPosts }] = useStateValue();
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".profilePageTagged");
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    })
    useEffect(()=>{
        if (userPosts) {
            var postWrapper = document.querySelector(".profileTagged__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin= "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
        }
    })
    return (
        <div className="profileTagged">
            <Profile />
            <div className="profileTagged__post">
            <div className="profileTagged__noPost">
                 < AccountBoxOutlinedIcon className="profileTagged__noPost_icon" />
                </div>
                <div className="profileTagged__noPost_content">
                    <h3>Tagged</h3>
                    <p>You haven't been tagged to any of your followers photos and videos yet. </p>
                </div>
                {/* {userPosts.length > 0 &&
                    userPosts.map(({ post, id }) => {
                        return (
                            <div key={id} className="profileTagged__gridItem">
                                <img src={post.postImage} alt="post" />
                            </div>
                        )
                    }
                    )
                } */}
            </div>
        </div>
    )
}

export default ProfileTagged
