import React, { useState, useEffect } from 'react'
import './cssStyles/signUp.css'
import { Link, useHistory } from 'react-router-dom'
import {auth} from './firebase'
import { sendNewUserInfoToDb } from './get&setDatato&FroDb';

function SignUp({ setRefresh, setNewUser }) {
    const [email, setEmail] = useState(""); // keeps state for inputed user email
    const [password, setPassword] = useState(""); // keeps state for inputed user password
    const [fullName, setFullName] = useState(""); // keeps state for inputed user fullname
    const [username, setUsername] = useState(""); // keeps state for inputed user username
    const [showPassword, setShowPassword] = useState(false); // keeps state if password is showed or not
    const history = useHistory(); // a fucition from react-router-dom so as to be able to redirect to the timeline when a new user sign up

    useEffect(() => { // changes sign up btn style if all input field are filled
        let btnColor = document.querySelector(".signup__submitBtn");
        if (email && password && fullName && username) {
            btnColor.style.backgroundColor = "#0095F6"
        } else {
            btnColor.style.backgroundColor = "#B2DFFC"
        }
    }, [email, password, fullName, username])

    const signUp = (e) => { // sign up a new user if all input are filled and redirect to the timeline page
        e.preventDefault()
        if (email && password && fullName && username) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    sendNewUserInfoToDb(authUser, fullName, username);
                    setEmail("");
                    setUsername("");
                    setFullName("");
                    setPassword("");
                    setRefresh(true);
                    setNewUser(true);
                    return authUser.user.updateProfile({
                        displayName: username
                    })
                }).then(authUser => {
                    console.log(authUser)
                    history.push("/timeline") // redirect to timeline page
                })
                .catch((error) => alert(error.message))
        }
    }
    const showPw = (e) => { // shows or hide user password
        e.preventDefault();
        let input = document.querySelector(".signup__sec1 > form > div > .signup__formInput")
        if (showPassword) {
            input.type = "password"
            setShowPassword(false)
        } else {
            input.type = "text"
            setShowPassword(true)
        }
    }

    return (
        <div className="signup">
            <section className="signup__mainSec">
                <section className="signup__sec1">
                    <div className="signup__logo">
                        <img src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png" alt="logo" />
                    </div>
                    <h2>Sign up to see photos and videos from your friends.</h2>
                    <Link to="/login">
                        <div className="signup__fb">
                            <img src="/img/fb-transparent.png" alt="facebook" />
                            <p>Login With Facebook</p>
                        </div>
                    </Link>
                    <div className="signup__dash">
                        <div className="firstDash"></div>
                        <p>OR</p>
                        <div className="secDash"></div>
                    </div>
                    <form className="signup__form">
                        <input
                            type="email"
                            className="signup__formInput"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" />
                        <input
                            type="text"
                            className="signup__formInput"
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name" />
                        <input
                            type="text"
                            className="signup__formInput"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username" />
                        <div>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="signup__formInput"
                                placeholder="Password" />
                            <button onClick={showPw} className="signup__showPassword">{showPassword ? "Hide" : "Show"}</button>
                        </div>
                        <button onClick={signUp} className="signup__submitBtn" type="submit">Sign Up</button>
                    </form>
                    <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                </section>
                <section className="signup__sec2">
                    <p>Have an Account?</p>
                    <Link to="/login"><span>Log In</span></Link>
                </section>
                <section className="signup__sec3">
                    <p>Get the App</p>
                    <div className="login__getapp">
                        <img src="/img/apple.png" alt="Google-Playstore" className="login__store" />
                        <img src="/img/google.png" alt="Apple_playstore" className="login__store" />
                    </div>
                </section>
            </section>
        </div>
    )
}

export default SignUp
