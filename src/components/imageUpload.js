import { Button } from '@material-ui/core';
import './cssStyles/imageUpload.css'
import React, { useState } from 'react'
import { storage, db } from './firebase'
import firebase from 'firebase'

function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                },
                (error) => { console.log(error.message); alert(error.message); },
                () => {
                    storage.ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                postImage: url,
                                username: username,
                            })
                            setProgress(0);
                            setImage(null);
                            setCaption("");
                        })
                })
        }

    }
    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"></progress>
            <input value={caption} type="text" className="imageupload__caption" placeholder="Enter a caption...." onChange={e => setCaption(e.target.value)} />
            <input type="file" className="imageupload__file" onChange={handleChange} />
            <Button className="imageupload__btn" onClick={handleUpload}>UPLOAD</Button>
        </div>
    )
}

export default ImageUpload
