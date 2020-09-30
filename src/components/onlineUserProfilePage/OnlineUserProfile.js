import React from 'react'
import '../cssStyles/onlineUserProfile.css'
import Avatar from '@material-ui/core/Avatar'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Link } from 'react-router-dom'
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import { useStateValue } from '../StateProvider'
import { setNewOnlineUserAviToDb } from '../get&setDatato&FroDb';


function OnlineUserProfile(props) {
    const [{ user, userPosts, following, followers, onlineUserInfo }, dispatch] = useStateValue(); // keeps state on current logged in user and userPosts

    const uploadAvi = (e) => {
        if (e.target.files[0]) {
            let image = e.target.files[0]
            setNewOnlineUserAviToDb(image, onlineUserInfo, dispatch);
        }
    }

    return (
        <div className="onlineUserProfile">
            <section className="onlineUserProfile__sec1">
                <div className="onlineUserProfile__avatar_wrapper">
                    <Avatar
                        className='onlineUserProfile__avatar'
                        title="Change your onlineUserProfile picture"
                        alt={"Change Your onlineUserProfile Picture"}
                        src={onlineUserInfo?.avatar}
                    />
                    <input title="Change your onlineUserProfile picture" onChange={uploadAvi} type="file" name="" id="" />
                </div>
                <div className="onlineUserProfile__detail">
                    <div className="pP__detail_row1">
                        <h3>{user?.displayName}</h3>
                        {onlineUserInfo?.verified && <img src="/img/verified.png" alt="" className="onlineUserProfile__Verified"/>}
                        <p>Edit Profile</p>
                        <SettingsOutlinedIcon className="onlineUserProfile__settinsIcon" />
                    </div>
                    <div className="pP__deatil_row2">
                        <p className="postNum"><strong>{userPosts.length}</strong> Posts</p>
                        <p className="followerNum"><strong>{followers.length}</strong> followers</p>
                        <p className="followingNum"><strong>{following.length}</strong> following</p>
                    </div>
                    <h4>{user?.displayName}</h4>
                </div>
            </section>
            <section className="onlineUserProfile__sec2">
                <div className="navLinks" >
                    <Link to='/onlineUserProfile'>
                        <div className="UserPost navLink">
                            <GridOnOutlinedIcon className='navLink_icon onlineUserPost' />
                            <p>Post</p>
                        </div>
                    </Link>
                    <Link to='/onlineUserProfile/igtv'>
                        <div className="UserIgtv navLink">
                            <LiveTvOutlinedIcon className='navLink_icon' />
                            <p>IGTV</p>
                        </div>
                    </Link>
                    <Link to='/onlineUserProfile/saved'>
                        <div className="UserSaved navLink">
                            <BookmarkBorderSharpIcon className='navLink_icon' />
                            <p>SAVED</p>
                        </div>
                    </Link>
                    <Link to='/onlineUserProfile/tagged'>
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

export default OnlineUserProfile
