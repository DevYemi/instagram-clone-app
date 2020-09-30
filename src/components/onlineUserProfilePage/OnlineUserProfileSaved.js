import React from 'react'
import OnlineUserProfile from './OnlineUserProfile'
import SavedPosts from '../profilePageComponents/SavedPosts'
import '../cssStyles/onlineUserProfileSaved.css'
import { useStateValue } from '../StateProvider';
function OnlineUserProfileSaved() {
    const [{userSavedPosts}] = useStateValue();
    return (
        <div className="onlineUserProfileSaved">
            <OnlineUserProfile />
            <SavedPosts userSavedPosts={userSavedPosts} />
        </div>
    )
}

export default OnlineUserProfileSaved


