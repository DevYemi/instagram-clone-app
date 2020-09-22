import React from 'react'
import {Link} from 'react-router-dom'
import './cssStyles/footer.css'

function Footer() {
    return (
        <div className="footer">
            <footer>
                <div className="footer__helpLinks">
                    <Link to="/"><p className="footer__helpLink">About</p></Link>
                    <Link to="/"><p className="footer__helpLink">Help</p></Link>
                    <Link to="/"><p className="footer__helpLink">Press</p></Link>
                    <Link to="/"><p className="footer__helpLink">Jobs</p></Link>
                    <Link to="/"><p className="footer__helpLink">Privacy</p></Link>
                    <Link to="/"><p className="footer__helpLink">Terms</p></Link>
                    <Link to="/"><p className="footer__helpLink">Location</p></Link>
                    <Link to="/"><p className="footer__helpLink">Top Accounts</p></Link>
                    <Link to="/"><p className="footer__helpLink">Language</p></Link>
                    <Link to="/"><p className="footer__helpLink">HashTag</p></Link>
                </div>
                <div className="footer__text">© 2020 INSTAGRAM FROM FACEBOOK</div>
            </footer>
        </div >
    )
}

export default Footer
