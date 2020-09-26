import { db } from './firebase'
import firebase from 'firebase'
import { storage } from './firebase';


export function getOnlineUserInfo(user, dispatch) { // get in info on the current logged in user

    let docRef = db.collection("registeredUser").doc(user.email)
    docRef.get().then(doc => {
        if (doc.exists) {
            console.log(doc.data())
            dispatch({
                type: "SET_ONLINE_USER_INFO",
                onlineUserInfo: doc.data()
            })
        } else {
            console.log("there is no such data")
        }
    }).catch((e) => { console.log(e) })
}

export function getFollowers(user, dispatch) { // get the followers of the current logged in user
    return db.collection("registeredUser")
        .doc(user?.email)
        .collection("followers")
        .onSnapshot(snapshot => {
            dispatch({
                type: "SET_FOLLOWERS",
                followers: snapshot.docs.map(doc => { return { follower: doc.data(), id: doc.id } })
            }
            )
        })
}

export function getUserPosts(user, dispatch) {  // get the posts of the current logged in user
    return db.collection("registeredUser")
        .doc(user?.email)
        .collection("posts")
        .orderBy("timeStamp", "desc")
        .onSnapshot(snapshot => {
            dispatch({
                type: "SET_USER_POSTS",
                userPosts: snapshot.docs.map(doc => { return { post: doc.data(), id: doc.id } })
            }
            )
        })
}

export function getFollowing(user, dispatch) {  // get the following of the current logged in user
    return db.collection("registeredUser")
        .doc(user.email)
        .collection("following")
        .onSnapshot(snapshot => {
            dispatch({
                type: "SET_FOLLOWING",
                following: snapshot.docs.map(doc => { return { following: doc.data(), id: doc.id } })
            }
            )
        })
}

export function getTimelinePosts(user, dispatch) {  // get and compile of the current logged in user timeline post gotten from the user following

    const getFollowingPostFromDb = (id) => {
        let avatar;
        let docRef = db.collection("registeredUser").doc(id)
        docRef.get().then(doc => { // Gets the poster Avi from the db
            if (doc.exists) {
                avatar = doc.data().avatar
            } else {
                console.log("there is no such data")
            }
        }).then(() => { // then gets the Poster posts from the db
            db.collection("registeredUser")
                .doc(id)
                .collection("posts")
                .orderBy("timeStamp", "desc")
                .onSnapshot(snapshot => {
                    dispatch({
                        type: "SET_TIMELINE_POSTS",
                        timelinePosts: snapshot.docs.map(doc => { return { timelinePosts: doc.data(), id: doc.id, posterEmail: id, posterAvi: avatar } })
                    }
                    )
                })
        }).catch((e) => { console.log(e) })
    }
    return db.collection("registeredUser")
        .doc(user.email)
        .collection("following")
        .onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc => { return { post: doc.data(), id: doc.id } }))
            let following = snapshot.docs.map(doc => doc.data())
            following.forEach(following => {
                getFollowingPostFromDb(following.followingEmail);
            });
        })
}
export function getCommentsFromDb(posterEmail, postId, setComments) { // gets a post comment from the db
    return db
        .collection("registeredUser")
        .doc(posterEmail)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => doc.data()))
        });
}

export function getLikesFromDb(posterEmail, postId, setTotalLikes, user, setLikeId) { // gets the totalLikes from the db and check if the current logged has  previously liked the post
    return db
        .collection("registeredUser")
        .doc(posterEmail)
        .collection("posts")
        .doc(postId)
        .collection("totalLikes")
        .onSnapshot(snapshot => {
            let array = snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }));
            setTotalLikes(array);
            array.forEach((totalLike) => {
                totalLike.data.like === user?.email && setLikeId(totalLike.id);
            })
        });
}
export function setCommentToDb(posterEmail, postId, user, comment) { // send and set the current logged in user comment on a post to the db
    db.collection("registeredUser")
        .doc(posterEmail)
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
            text: comment,
            username: user?.displayName || "Anonymous",
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
}
export function setLikesToDb(eventType, user, posterEmail, postId, totalLikes, likeId, setLiked, setLikeId) {  // add or remove the current logged in user like on a post in the db
    switch (eventType) {
        case "ADD":
            if (!user) {
                alert("Please Log In To Be Able To Like A Post")
            } else {
                db.collection("registeredUser")
                    .doc(posterEmail)
                    .collection('posts')
                    .doc(postId)
                    .collection('totalLikes')
                    .add({ like: user.email });
                setLiked(true);
            }

            break;
        case "REMOVE":
            totalLikes.forEach((totalLike) => {
                totalLike.data.like === user?.email && setLikeId(totalLike.id);
            })
            if (likeId) {
                db.collection("registeredUser")
                    .doc(posterEmail)
                    .collection('posts')
                    .doc(postId)
                    .collection('totalLikes')
                    .doc(likeId)
                    .delete();
                setLiked(false);
                setLikeId("");
            }

            break;

        default:
            break;
    }

}

export function setNewUploadedPostToDb(caption, url, username) {
    db.collection("posts").add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        caption: caption,
        postImage: url,
        username: username,
    })
}

export function sendNewUserInfoToDb(authUser, fullName, username) { // sends the new created user data to the db
    db.collection("registeredUser")
        .doc(authUser.user.email)
        .set({
            email: authUser.user.email,
            fullname: fullName,
            username: username,
            avatar: ""
        })
}
export function setNewOnlineUserAviToDb(image, user) {
    const uploadTask = storage.ref(`images/${image.name}`).put(image) // saved new image to storage
    uploadTask.on("state_changed",
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
        },
        (error) => { console.log(error.message); alert(error.message); },
        () => {
            storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    let docRef = db.collection("registeredUser").doc(user.email)
                    docRef.get().then(doc => {
                    docRef.update({
                        avatar: url
                    }).then(() =>{alert("Avi successfully updated 🙂🙂🙂")})
                    })
                })
        })
}