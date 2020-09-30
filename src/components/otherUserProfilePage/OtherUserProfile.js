import React, { useState } from 'react'
import '../cssStyles/otherUserProfile.css'
import Avatar from '@material-ui/core/Avatar'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom'
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import { useStateValue } from '../StateProvider'
import { setNewOnlineUserAviToDb } from '../get&setDatato&FroDb';


function OtherUserProfile(props) {
    const [{ user, userPosts, following, followers, onlineUserInfo }, dispatch] = useStateValue(); // keeps state on current logged in user and userPosts
    const [follow, setFollow] = useState(false)
    const uploadAvi = (e) => {
        if (e.target.files[0]) {
            let image = e.target.files[0]
            setNewOnlineUserAviToDb(image, onlineUserInfo, dispatch);
        }
    }
    const handleFollow = () => {
        setFollow(true)
        var follow = document.querySelector(".otherUserProfile__detail_row1 > p")
        var optionsIcon = document.querySelector(".otherUserProfile__dropDownIcon")
        var unfollowBtn = document.querySelector(".otherUserProfile__unfollow")
        follow.style.backgroundColor = "transparent"
        follow.style.color = "black"
        unfollowBtn.style.display = "flex"
        optionsIcon.style.backgroundColor = "transparent"
        optionsIcon.style.color = "black"
    }
    const handleUnfollow = () => {
        setFollow(false);
        var follow = document.querySelector(".otherUserProfile__detail_row1 > p");
        var optionsIcon = document.querySelector(".otherUserProfile__dropDownIcon")
        var unfollowBtn = document.querySelector(".otherUserProfile__unfollow")
        follow.style.backgroundColor = "#0095F6"
        follow.style.color = "white"
        unfollowBtn.style.display = "none"
        optionsIcon.style.color = "white"
        optionsIcon.style.backgroundColor = "#0095f6"
    }

    return (
        <div className="otherUserProfile">
            <section className="otherUserProfile__sec1">
                <div className="otherUserProfile__avatar_wrapper">
                    <Avatar
                        className='otherUserProfile__avatar'
                        title="Change your otherUserProfile picture"
                        alt={"Change Your otherUserProfile Picture"}
                        src={onlineUserInfo?.avatar}
                    />
                </div>
                <div className="otherUserProfile__detail">
                    <div className="otherUserProfile__detail_row1">
                        <h3>{user?.displayName}</h3>
                        {onlineUserInfo?.verified && <img src="/img/verified.png" alt="" className="otherUserProfile__Verified" />}
                        <div className="otherUserProfile__icons mobile">
                        <ArrowDropDownIcon className="otherUserProfile__dropDownIcon" />
                        <MoreHorizIcon className="otherUserProfile__optionsIcon" />
                        </div>
                        <p onClick={handleFollow}>{follow ? "Following" : "Follow"}</p>
                        <div onClick={handleUnfollow} className="otherUserProfile__unfollow">
                            <PersonIcon className="otherUserProfile__unfollowIcon" />
                            <CheckIcon className="otherUserProfile__unfollowIcon check" />
                        </div>
                        <div className="otherUserProfile__icons web">
                        <ArrowDropDownIcon className="otherUserProfile__dropDownIcon" />
                        <MoreHorizIcon className="otherUserProfile__optionsIcon" />
                        </div>
                    </div>
                    <div className="otherUserProfile__deatil_row2">
                        <p className="postNum"><strong>{userPosts.length}</strong> Posts</p>
                        <p className="followerNum"><strong>{followers.length}</strong> followers</p>
                        <p className="followingNum"><strong>{following.length}</strong> following</p>
                    </div>
                    <h4>{user?.displayName}</h4>
                </div>
            </section>
            <section className="otherUserProfile__sec2">
                <div className="navLinks" >
                    <Link to='/otheruserprofile/posts'>
                        <div className="UserPost navLink">
                            <GridOnOutlinedIcon className='navLink_icon onlineUserPost' />
                            <p>Post</p>
                        </div>
                    </Link>
                    <Link to='/otheruserprofile/igtv'>
                        <div className="UserIgtv navLink">
                            <LiveTvOutlinedIcon className='navLink_icon' />
                            <p>IGTV</p>
                        </div>
                    </Link>
                    <Link to='/otheruserprofile/saved'>
                        <div className="UserSaved navLink">
                            <BookmarkBorderSharpIcon className='navLink_icon' />
                            <p>SAVED</p>
                        </div>
                    </Link>
                    <Link to='/otheruserprofile/tagged'>
                        <div className="UserTagged navLink">
                            <AccountBoxOutlinedIcon className="navLink_icon" />
                            <p>TAGGED</p>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default OtherUserProfile
