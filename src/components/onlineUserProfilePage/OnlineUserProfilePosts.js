import React from 'react'
import OnlineUserProfile from './OnlineUserProfile'
import UploadedPosts from '../profilePageComponents/UploadedPosts'
import { useStateValue } from '../StateProvider';
import '../cssStyles/onlineUserProfilePosts.css'

function OnlineUserProfilePosts() {
    const [{ userPosts }] = useStateValue();
    return (
        <div className="onlineUserProfilePosts">
            <OnlineUserProfile />
            <UploadedPosts userPosts={userPosts} />
        </div>
    )
}

export default OnlineUserProfilePosts
