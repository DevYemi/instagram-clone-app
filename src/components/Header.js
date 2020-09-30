import React, { useEffect } from 'react'
import './cssStyles/header.css'
import { Link, useHistory } from 'react-router-dom'
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
  const history = useHistory();  // a fucition from react-router-dom so as to be able to redirect to the login page when a new user sign out
  const [{ user }] = useStateValue(); // current logged in user
  const handleLogOut = () => { // sign out the current logged in user and redirect to the login page
      auth.signOut();
      history.push("/login");
  }


useEffect(()=>{ // shows and hide a div when the avatar icon is clicked in the header component
  const closeDiv = (event) => {
    let headerAvatarWrapper = document.querySelector(".header__avatarWrapper");
    let avatarLinks = document.querySelector(".header__avatarLinks");
    let insideAvatarWrapper = headerAvatarWrapper.contains(event.target);
    let insideAvatarLinks = avatarLinks.contains(event.target)
    if ((insideAvatarLinks && insideAvatarWrapper) || !insideAvatarWrapper) {
      avatarLinks.style.display = "none"
    } else if (insideAvatarWrapper) {
      avatarLinks.style.display = "flex"
    }
  }
  window.addEventListener("click", closeDiv )
  return () => {window.removeEventListener("click", closeDiv)}
},[])


  return (
    <header>
      <div className="header">
        <div className="header__column1">
          <Link to='/timeline'>
            <img src="https://logo-logos.com/wp-content/uploads/2016/10/Instagram_logo_wordmark_logotype.png" alt="logo" className="header__logo" />
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
              <Link to="/profile/saved">
                <BookmarkBorderSharpIcon />
                <span>Saved</span>
              </Link>
              <Link to="/">
                <SettingsOutlinedIcon />
                <span>Settings</span>
              </Link>
              <Button className="header__btn" onClick={handleLogOut}>Log out</Button>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header