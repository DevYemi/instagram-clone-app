export const initialState = { // InititalState given to the React Context API
    userPosts: [],
    user: null,
    timelinePosts: [],
    followers: [],
    following: [],
    onlineUserInfo: null
}

function reducer(state, action) { // changes the InitialState and set it to a new value
    switch (action.type) {
        case "SET_USER": 
        return {...state, user: action.user}
        case "SET_USER_POSTS": 
        return {...state, userPosts: action.userPosts}
        case "SET_TIMELINE_POSTS": 
        return {...state, timelinePosts: [...state.timelinePosts, ...action.timelinePosts]}
        case "SET_FOLLOWERS": 
        return {...state, followers: action.followers}
        case "SET_FOLLOWING": 
        return {...state, following: action.following}
        case "SET_ONLINE_USER_INFO": 
        return {...state, onlineUserInfo: action.onlineUserInfo}

        default:
            return state
    }
}

export default reducer