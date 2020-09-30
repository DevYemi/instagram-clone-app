import React from 'react'
import OnlineUserProfile from './OnlineUserProfile'
import IgtvPosts from '../profilePageComponents/IgtvPosts'
import { useStateValue } from '../StateProvider'
import '../cssStyles/onlineUserProfileIgtv.css'
function OnlineUserProfileIgtv() {
    const [{ userPosts }] = useStateValue();
    return (
        <div className="onlineUserProfileIgtv">
            <OnlineUserProfile />
            <IgtvPosts userPosts={userPosts}/>
        </div>
    )
}

export default OnlineUserProfileIgtv
