import React from 'react'
import OtherUserProfile from './OtherUserProfile'
import TaggedPosts from '../profilePageComponents/TaggedPosts'
import '../cssStyles/otherUserProfileTagged.css'
import { useStateValue } from '../StateProvider';
function OtherUserProfileTagged() {
    const [{userPosts}] = useStateValue();
    return (
        <div className="OtherUserProfileTagged">
            <OtherUserProfile />
            <TaggedPosts userPosts={userPosts} />
        </div>
    )
}

export default OtherUserProfileTagged


