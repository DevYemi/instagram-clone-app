import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './cssStyles/sidebar.css'
import { Link } from 'react-router-dom'
import {useStateValue} from './StateProvider'

function Sidebar() {
  const [{user, onlineUserInfo}] = useStateValue();

    return (
        <div className="asideWrapper">
            <div className="sidebar">
                <div className="sidebar__row1">
                    <Avatar
                        className='user__avatar'
                        alt={user?.displayName}
                        src={"me"}
                    />
                    <div className="row1__text">
                        <h4>{onlineUserInfo?.username}</h4>
                        <p>{onlineUserInfo?.fullname}</p>
                    </div>
                </div>
                <div className="sidebar__row2">
                    <div>
                        <p>suggestion for you</p>
                        <div className="sidebar__divs">
                            <Avatar
                                className='user__avatar'
                                alt={user?.displayName}
                                src={"me"}
                            />
                            <div className="row2__text">
                                <h4>{user?.displayName}</h4>
                                <p>follow you</p>
                            </div>
                        </div>
                        <div className="sidebar__divs">
                            <Avatar
                                className='user__avatar'
                                alt={user?.displayName}
                                src={"me"}
                            />
                            <div className="row2__text">
                                <h4>{user?.displayName}</h4>
                                <p>follow you</p>
                            </div>
                        </div>
                        <div className="sidebar__divs">
                            <Avatar
                                className='user__avatar'
                                alt={user?.displayName}
                                src={"me"}
                            />
                            <div className="row2__text">
                                <h4>{user?.displayName}</h4>
                                <p>follow you</p>
                            </div>
                        </div>
                        <div className="sidebar__divs">
                            <Avatar
                                className='user__avatar'
                                alt={user?.displayName}
                                src={"me"}
                            />
                            <div className="row2__text">
                                <h4>{user?.displayName}</h4>
                                <p>follow you</p>
                            </div>
                        </div>
                    </div>
                    <div className="div__links">
                        <p>see all</p>
                        <Link to="/"><p className="aside__link">follow</p></Link>
                        <Link to="/"><p className="aside__link">follow</p></Link>
                        <Link to="/"><p className="aside__link">follow</p></Link>
                        <Link to="/"><p className="aside__link">follow</p></Link>
                        <Link to="/"><p className="aside__link">follow</p></Link>
                        <Link to="/"><p className="aside__link">follow</p></Link>

                    </div>
                </div>
                <div className="aside__helpLinks">
                <Link to="/"><p className="aside__helpLink">About</p></Link>
                <Link to="/"><p className="aside__helpLink">Help</p></Link>
                <Link to="/"><p className="aside__helpLink">Press</p></Link>
                <Link to="/"><p className="aside__helpLink">Jobs</p></Link>
                <Link to="/"><p className="aside__helpLink">Privacy</p></Link>
                <Link to="/"><p className="aside__helpLink">Terms</p></Link>
                <Link to="/"><p className="aside__helpLink">Location</p></Link>
                <Link to="/"><p className="aside__helpLink">Top Accounts</p></Link>
                <Link to="/"><p className="aside__helpLink">Language</p></Link>
                <Link to="/"><p className="aside__helpLink">HashTag</p></Link>
                </div>
                <div className="aside__footer">© 2020 INSTAGRAM FROM FACEBOOK</div>
            </div>
        </div>
    )
}

export default Sidebar
