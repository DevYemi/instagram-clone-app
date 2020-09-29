import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './cssStyles/sidebar.css'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { addNewFollowedUserOnDb, removeFollowedUserOnDb } from './get&setDatato&FroDb'

function Sidebar() {
    const [{ user, onlineUserInfo, SuggestedUser, following }] = useStateValue();
    useEffect(() => { // keeps following state when a user leaves the timeline page and comes back
        var followLinks = document.getElementsByClassName("aside__link")
        var followLinksArray = Array.from(followLinks)
        if (followLinksArray) {
            for (let i = 0; i < followLinksArray.length; i++) {
                const followLink = followLinksArray[i];
                following.forEach((following) => {
                    if (following.id === followLink.dataset.suggestedEmail) {
                        followLink.innerHTML = "Following"
                        followLink.style.color = "black"
                    }
                })
            }
        }
    }, [following, SuggestedUser])
    const followSugUser = (e) => { //handles the follow and unfollow feature
        var clickedElement = e.target.innerHTML
        if (clickedElement === "Follow") { // follow the suggested user
            let followedSugEmail = e.target.dataset.suggestedEmail;
            addNewFollowedUserOnDb(onlineUserInfo?.email, followedSugEmail);
            e.target.innerHTML = "Following"
            e.target.style.color = "black"
        } else { // online user is following the suggested user alreday so unfollow suggested user
            let followedSugEmail = e.target.dataset.suggestedEmail;
            removeFollowedUserOnDb(onlineUserInfo?.email, followedSugEmail);
            e.target.innerHTML = "Follow"
            e.target.style.color = "#3AACF7"
        }

    }

    return (
        <div className="asideWrapper">
            <div className="sidebar">
                <div className="sidebar__row1">
                    <Avatar
                        className='user__avatar'
                        alt={user?.displayName}
                        src={onlineUserInfo?.avatar}
                    />
                    <div className="row1__text">
                        <h4>{onlineUserInfo?.username}</h4>
                        <p>{onlineUserInfo?.fullname}</p>
                    </div>
                </div>
                <div className="sidebar__row2">
                    <div className="sidebar__row2_text">
                        <p>suggestion for you</p>
                        <p>see all</p>
                    </div>
                    {SuggestedUser && SuggestedUser.map((sugUser, index) => (
                        <div key={index} className="sidebar__divs-wrapper">
                            <div className="sidebar__divs">
                                <Avatar
                                    className='suggested__avatar'
                                    alt={sugUser.username}
                                    src={sugUser.avatar}
                                />
                                <div className="row2__text">
                                    <h4>{sugUser.username}</h4>
                                    <p>suggested for you</p>
                                </div>
                            </div>
                            <div className="div__links" >
                                <p data-suggested-email={sugUser.email} onClick={followSugUser} className="aside__link">Follow</p>
                            </div>
                        </div>
                    ))}

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
        </div >
    )
}

export default Sidebar
