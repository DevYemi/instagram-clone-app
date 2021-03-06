import React from 'react'
import OnlineUserProfile from './OnlineUserProfile'
import TaggedPosts from '../profilePageComponents/TaggedPosts'
import '../cssStyles/onlineUserProfileTagged.css'
import { useStateValue } from '../StateProvider';
function OnlineUserProfileTagged() {
    const [{userPosts}] = useStateValue();
    return (
        <div className="onlineUserProfileTagged">
            <OnlineUserProfile />
            <TaggedPosts userPosts={userPosts} />
        </div>
    )
}

export default OnlineUserProfileTagged


