import React from 'react'
import Avatar from '@material-ui/core/Avatar'

function Post(props) {
    const { postImage, userName, caption, avatar } = props
    return (
        <div className='post'>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt={userName}
                    src={avatar}
                />
                <h3>{userName}</h3>

            </div>

            <img src={postImage} alt="post" className="post__image" />
            <h4 className="post__text"><strong>  {userName}</strong>{caption}</h4>
        </div>
    )
}

export default Post