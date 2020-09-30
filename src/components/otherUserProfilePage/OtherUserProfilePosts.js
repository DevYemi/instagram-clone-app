import React from 'react'
import OtherUserProfile from './OtherUserProfile'
import UploadedPosts from '../profilePageComponents/UploadedPosts'
import '../cssStyles/otherUserProfilePosts.css'
import { useStateValue } from '../StateProvider';
function OtherUserProfilePosts() {
    const [{userPosts}] = useStateValue();
    return (
        <div className="otherUserProfilePosts">
            <OtherUserProfile />
            <UploadedPosts userPosts={userPosts} />
        </div>
    )
}

export default OtherUserProfilePosts
