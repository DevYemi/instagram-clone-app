import React from 'react'
import './cssStyles/profilePage.css'
import Avatar from '@material-ui/core/Avatar'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Link } from 'react-router-dom'
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import { useStateValue } from './StateProvider'

function ProfilePage(props) {
    const [{ user, posts }] = useStateValue();
    console.log(posts)
    return (
        <div className="profilePage">
            <section className="profilePage__sec1">
                <Avatar
                    className='profilePage__avatar'
                    alt={"Change Your Profile Picture"}
                    src={""}
                />
                <div className="profilePage__detail">
                    <div className="pP__detail_row1">
                        <h3>{user?.displayName}</h3>
                        <p>Edit Profile</p>
                        <SettingsOutlinedIcon className="profilePage__settinsIcon" />
                    </div>
                    <div className="pP__deatil_row2">
                        <p className="postNum"><strong>4</strong> Posts</p>
                        <p className="followerNum"><strong>0</strong> followers</p>
                        <p className="followingNum"><strong>0</strong> following</p>
                    </div>
                    <h4>{user?.displayName}</h4>
                </div>
            </section>
            <section className="profilePage__sec2">
                <div className="navLinks">
                    <Link to='/'>
                        <div className="profilePagepost navLink active">
                            <GridOnOutlinedIcon className='navLink_icon profilePagepost' />
                            <p>Post</p>
                        </div>
                    </Link>
                    <Link to='/'>
                        <div className="navLink">
                            <LiveTvOutlinedIcon className='navLink_icon profilePageigtv' />
                            <p>IGTV</p>
                        </div>
                    </Link>
                    <Link to='/'>
                        <div className="profilePagesaved navLink">
                            <BookmarkBorderSharpIcon className='navLink_icon' />
                            <p>SAVED</p>
                        </div>
                    </Link>
                    <Link to='/'>
                        <div className="profilePagetagged navLink">
                            <AccountBoxOutlinedIcon className="navLink_icon" />
                            <p>TAGGED</p>
                        </div>
                    </Link>
                </div>
                <div className="profilePage__post">
                    {posts.length > 0 &&
                        posts.map(({ post, id }) => {
                            return (
                                <div className="profilePage__gridItem">
                                    <img src={post.postImage} alt="post" />
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default ProfilePage
