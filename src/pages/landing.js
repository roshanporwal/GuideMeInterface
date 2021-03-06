import React from 'react';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <>
        <div id="HomeSection">
            <img src="../assets/images/Banner.png" className="img-fluid DesktopView" alt="" />
            <img src="../assets/images/BannerMob.png" className="img-fluid MobileView" alt="" />
            <Link to="/home" target="_blank" className="hospital">Hospital</Link>
            <Link to="/admin" target="_blank" className="login">Admin</Link>
            <Link to="/feedback" target="_blank" className="feedback">Feedback</Link>
            <Link class="callus" to="tel:04 3562356">Call Us</Link>
	</div>
        </>
    )
}