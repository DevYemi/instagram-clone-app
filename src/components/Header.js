import React from 'react'
import './cssStyles/header.css'
import { Link } from 'react-router-dom'
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
import { useStateValue } from './StateProvider'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';


function Header({ setModalOpen, setModalType }) {
  const [{ user }] = useStateValue();
  const handleLogEntry = (type) => {
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

  // const handleSignUp = (type) => {
  //   setModalOpen(true);
  //   setModalType("signUp")
  // }

    window.addEventListener("click", (event) => {
      let headerAvatarWrapper = document.querySelector(".header__avatarWrapper");
      let avatarLinks = document.querySelector(".header__avatarLinks");
      let insideAvatarWrapper = headerAvatarWrapper.contains(event.target);
      let insideAvatarLinks = avatarLinks.contains(event.target)
       if ((insideAvatarLinks && insideAvatarWrapper) || !insideAvatarWrapper){
        avatarLinks.style.display = "none"
        console.log("move")
      }else if (insideAvatarWrapper) {
        avatarLinks.style.display = "flex"
        console.log("run")
      }
    })

  return (
    <header>
      <div className="header">
        <div className="header__column1">
          <Link to='/'>
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="header__logo" />
          </Link>
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
          <div className="header__avatarWrapper">
            <Avatar
              className='header__avatar'
              alt={user?.displayName || "Anonymous"}
              src={user?.avatar}
            />
            <div className="header__avatarLinks">
              <ChangeHistoryOutlinedIcon id="header__avatarLinks_indicator" />
              <Link to="/profile">
                <AccountBoxOutlinedIcon />
                <span>Profile</span>
              </Link>
              <Link to="/saved">
                <BookmarkBorderSharpIcon />
                <span>Saved</span>
              </Link>
              <Link to="/profile">
                <SettingsOutlinedIcon />
                <span>Settings</span>
              </Link>
              <Button className="header__btn" onClick={() => handleLogEntry("out")}>Log out</Button>
            </div>
          </div>


          {/* {user ? <Button className="header__btn" onClick={() => handleLogEntry("out")}>Log out</Button>
            : <div className="header__btns"><Button className="header__btn" onClick={() => handleSignUp()}>Sign Up</Button>
              <Button className="header__btn" onClick={() => handleLogEntry("in")}>Log In</Button> </div>} */}
        </div>
      </div>
    </header>
  )
}

export default Header