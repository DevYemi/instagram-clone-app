import React, { useEffect, useState } from 'react'
import './cssStyles/login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'




function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        let interval = setInterval(() => {
            let loginImg = document.querySelector(".login__img")
            let loginImgArray = Array.from(loginImg.children);
            let currentActive = loginImg.querySelector(".active")
            let nextActive = currentActive.nextElementSibling
            if (!nextActive) {
                nextActive = loginImgArray[0];
            }
            const animateImage = (current, next) => {
                current.classList.remove("active");
                next.classList.add("active");
            }
            animateImage(currentActive, nextActive)
        }, 4000)

        return () => clearInterval(interval)
    })
    const logIn = (e) => {
        e.preventDefault();
        setEmail("")
        setPassword("")
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push("/");
            })
            .catch(e => { alert(e);})

    }
    const showPw = (e) =>{
        e.preventDefault();
        let input = document.querySelector(".login__sec1 > form > div > .login__formInput")
        if (showPassword) {
            input.type = "password"
            setShowPassword(false)
        }else {
            input.type = "text"
            setShowPassword(true)
        }
    }
    return (
        <div className="login">
            <section className="login__mainSec">
                <div className="login__img">
                    <img className="active" src="/img/login-img1.jpg" alt="" />
                    <img className="" src="/img/login-img2.jpg" alt="" />
                    <img className="" src="/img/login-img3.jpg" alt="" />
                    <img className="" src="/img/login-img4.jpg" alt="" />
                    <img className="" src="/img/login-img5.jpg" alt="" />
                </div>
                <div className="login__form">
                    <section className="login__sec1">
                        <div className="login__logo">
                            <img src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png" alt="logo" />
                        </div>
                        <form className="login__form">
                            <input
                                type="email"
                                className="login__formInput"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" />
                            <div>
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login__formInput"
                                    placeholder="Password" />
                                <button onClick={showPw} className="login__showPassword">{showPassword ? "Hide" : "Show"}</button>
                            </div>
                            <button onClick={logIn} className="login__submitBtn" type="submit">Log In</button>
                        </form>
                        <div className="login__dash">
                            <div className="firstDash"></div>
                            <p>OR</p>
                            <div className="secDash"></div>
                        </div>
                        <Link to="/login">
                            <div className="login__fb">
                                <img src="/img/facebook.png" alt="" />
                                <p>Login With Facebook</p>
                            </div>
                        </Link>
                        <Link to="/login">
                            <p className="login__fogetPassword">Forget Password?</p>
                        </Link>
                    </section>
                    <section className="login__sec2">
                        <p>Don't Have An Account?</p>
                        <Link to="/signup">
                            <span>Sign up</span>
                        </Link>
                    </section>
                    <section className="login__sec3">
                        <p>Get the App</p>
                        <div className="login__getapp">
                            <img src="/img/apple.png" alt="Google-Playstore" className="login__store" />
                            <img src="/img/google.png" alt="Apple_playstore" className="login__store" />
                        </div>
                    </section>

                </div>
            </section>
        </div>
    )
}

export default Login
