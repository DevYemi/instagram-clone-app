import React from 'react'
import OnlineUserProfile from './OnlineUserProfile'
import IgtvPosts from '../profilePageComponents/IgtvPosts'
import '../cssStyles/onlineUserProfileIgtv.css'
import { useStateValue } from '../StateProvider';
function OnlineUserProfileIgtv() {
    const [{userPosts}] = useStateValue();
    return (
        <div className="onlineUserProfileIgtv">
            <OnlineUserProfile />
            <IgtvPosts userPosts={userPosts} />
        </div>
    )
}

export default OnlineUserProfileIgtv


