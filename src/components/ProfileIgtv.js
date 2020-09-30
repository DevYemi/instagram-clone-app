import React, { useEffect } from 'react'
import Profile from './Profile';
import { useStateValue } from './StateProvider';
import './cssStyles/profileIgtv.css'
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';

function ProfileIgtv() {
    const [{ userPosts }] = useStateValue();
    console.log("render")
    useEffect(() => {
        var prevActiveNav = document.querySelector(".navLink.active");
        var curActiveNav = document.querySelector(".profilePageigtv")
        prevActiveNav && prevActiveNav.classList.remove("active")
        curActiveNav.classList.add("active")
    })
    useEffect(()=>{
        if (userPosts) {
            var postWrapper = document.querySelector(".profileIgtv__post");
            postWrapper.style.display = "block"
            postWrapper.style.width = "300px"
            postWrapper.style.margin= "1em auto 0 auto"
            postWrapper.style.textAlign = "center"
        }
    })
    return (
        <div className="profileIgtv">
            <Profile />
            <div className="profileIgtv__post">
            <div className="profileIgtv__noPost">
                 < LiveTvOutlinedIcon className="profileIgtv__noPost_icon" />
                </div>
                <div className="profileIgtv__noPost_content">
                    <h3>Upload a Video</h3>
                    <p>Videos must be between 1 and 60 minutes long.</p>
                </div>
                {/* {userPosts.length > 0 &&
                    userPosts.map(({ post, id }) => {
                        return (
                            <div key={id} className="profileIgtv__gridItem">
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

export default ProfileIgtv
