import React from 'react'
import './cssStyles/header.css'
import { auth } from './firebase'
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SendIcon from '@material-ui/icons/Send';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';


function Header({ user, setModalOpen, setModalType }) {
  // const handleLogEntry = (type) => {
  //   switch (type) {
  //     case "out":
  //       if (user) {
  //         auth.signOut()
  //       }
  //       break;
  //     case "in":
  //       setModalOpen(true);
  //       setModalType("logIn")
  //       break;

  //     default:
  //       break;
  //   }

  // }

  // const handleSignUp = (type) => {
  //   setModalOpen(true);
  //   setModalType("signUp")
  // }
  return (
    <header>
      <div className="header">
        <div className="header__column1">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="header__logo" />
        </div>
        <div className="header__column2">
          <div id="header__input">
            <SearchRoundedIcon id="header__input_icon" />
            <form>
              <input type="text" placeholder="search" className="header__search" />
            </form>
          </div>
          <HomeIcon className="icons header__homeIcon" />
          <SendOutlinedIcon className="icons header__sendIcon" />
          <ExploreOutlinedIcon className="icon header__exploreIcon" />
          <FavoriteBorderOutlinedIcon className="icons header__heartIcon" />
          <Avatar
            className='header__avatar'
            alt={user?.displayName || "Anonymous"}
            src={user?.avatar}
          />


          {/* {user ? <Button className="header__btn" onClick={() => handleLogEntry("out")}>Log out</Button>
            : <div className= "header__btns"><Button className="header__btn" onClick={() => handleSignUp()}>Sign Up</Button>
              <Button className="header__btn" onClick={() => handleLogEntry("in")}>Log In</Button> </div>} */}
        </div>
      </div>
    </header>
  )
}

export default Header