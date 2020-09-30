import React from 'react'
import OtherUserProfile from './OtherUserProfile'
import IgtvPosts from '../profilePageComponents/IgtvPosts'
import '../cssStyles/otherUserProfileIgtv.css'
import { useStateValue } from '../StateProvider';
function OtherUserProfileIgtv() {
    const [{userPosts}] = useStateValue();
    return (
        <div className="OtherUserProfileIgtv">
            <OtherUserProfile />
            <IgtvPosts userPosts={userPosts} />
        </div>
    )
}

export default OtherUserProfileIgtv


