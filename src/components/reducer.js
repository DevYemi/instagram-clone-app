export const initialState = { // InititalState given to the React Context API
    userPosts: [],
    userSavedPosts: [],
    user: null,
    timelinePosts: [],
    followers: [],
    following: [],
    onlineUserInfo: null,
    SuggestedUser: []
}
const filterTimelinePosts = (oldPosts, newPosts)=>{// merge new user follwered post with old user post so there wont be duplicate
  for (let i = 0; i < oldPosts.length; i++) {
      const oldPost = oldPosts[i];
     newPosts = newPosts.filter(newpost => newpost.id !== oldPost.id ) //  remove any post in the newpost that is already in the old post so we have only the new posts
      
  }
  return [...newPosts, ...oldPosts]
}

function reducer(state, action) { // changes the InitialState and set it to a new value
    switch (action.type) {
        case "SET_USER": 
        return {...state, user: action.user}
        case "SET_USER_POSTS": 
        return {...state, userPosts: action.userPosts}
        case "SET_USER_SAVED_POSTS": 
        return {...state, userSavedPosts: action.userSavedPosts}
        case "SET_TIMELINE_POSTS": 
         let updatedPosts =  filterTimelinePosts(state.timelinePosts, action.timelinePosts )
        return {...state, timelinePosts: updatedPosts}
        case "SET_FOLLOWERS": 
        return {...state, followers: action.followers}
        case "SET_FOLLOWING": 
        return {...state, following: action.following}
        case "SET_ONLINE_USER_INFO": 
        return {...state, onlineUserInfo: action.onlineUserInfo}
        case "SET_SUGGESTED_USERS": 
        return {...state, SuggestedUser: [...state.SuggestedUser, action.SuggestedUser]}

        default:
            return state
    }
}

export default reducer