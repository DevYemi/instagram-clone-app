import React from 'react'
import { auth } from './firebase'
import { Button } from '@material-ui/core';


function Header({user, setModalOpen, setModalType}) {
    const handleLogEntry = (type)=> {
        switch (type) {
          case "out":
            if (user) {
              auth.signOut()
            }
            break;
          case "in":
            setModalOpen(true);
            setModalType("logIn")
            break;
    
          default:
            break;
        }
    
      }
    
      const handleSignUp = (type)=> {
        setModalOpen(true);
        setModalType("signUp")
      }
    return (
        <header>
        <div className="header">
         <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="header__logo"/>
         { user ? <Button onClick={() => handleLogEntry("out")}>Log out</Button>
        : <div><Button onClick={() => handleSignUp()}>Sign Up</Button>
          <Button onClick={() => handleLogEntry("in")}>Log In</Button> </div>}
        </div>
        </header>
    )
}

export default Header