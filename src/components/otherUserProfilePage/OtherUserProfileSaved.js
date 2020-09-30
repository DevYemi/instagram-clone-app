import React from 'react'
import OtherUserProfile from './OtherUserProfile'
import SavedPosts from '../profilePageComponents/SavedPosts'
import '../cssStyles/otherUserProfileSaved.css'
function OtherUserProfileSaved({userSavedPosts}) {
    return (
        <div className="OtherUserProfileSaved">
            <OtherUserProfile />
            <SavedPosts userSavedPosts={userSavedPosts} />
        </div>
    )
}

export default OtherUserProfileSaved


