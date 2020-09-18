import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase'

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function GetModal({ modalOpen, setModalOpen, user, setUser, setModalType, modalType }) {
    console.log("rendering")
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user, username, setUser])

    function signUp(e) {
        e.preventDefault();
        setModalType("")
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                setEmail("")
                setUsername("")
                setModalOpen(false)
                setPassword("")
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))
    }
    function logIn() {
        setModalType("");
        setEmail("")
        setModalOpen(false)
        setUsername("")
        setPassword("")
        auth.signInWithEmailAndPassword(email, password)
            .catch(e => alert(e))

    }


    return (
        <>
            {modalType === "logIn" ?
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <center>
                            <form>
                                <div className="modal__form">
                                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="modal__headerLogo" />
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <Button id="modal__submit__btn" type="submit" onClick={logIn}>Sign In</Button>
                                </div>
                            </form>
                        </center>
                    </div>
                </Modal>
                :
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <center>
                            <form>
                                <div className="modal__form">
                                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="modal__headerLogo" />
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <Input
                                        placeholder="Username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{ width: "100%" }}
                                    />
                                    <Button id="modal__submit__btn" type="submit" onClick={signUp}>Sign Up</Button>
                                </div>
                            </form>
                        </center>
                    </div>
                </Modal>
            }
        </>
    )

}

export default React.memo(GetModal);