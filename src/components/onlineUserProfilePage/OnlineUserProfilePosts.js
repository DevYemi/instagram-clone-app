import React from 'react'
import OnlineUserProfile from './OnlineUserProfile'
import UploadedPosts from '../profilePageComponents/UploadedPosts'
import '../cssStyles/onlineUserProfilePosts.css'
import { useStateValue } from '../StateProvider';
function OnlineUserProfilePosts() {
    const [{userPosts}] = useStateValue();
    return (
        <div className="onlineUserProfilePosts">
            <OnlineUserProfile />
            <UploadedPosts userPosts={userPosts} />
        </div>
    )
}

export default OnlineUserProfilePosts
