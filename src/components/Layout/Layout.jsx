import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
function Layout() {
    return ( 
        <>
            <Header />
                <div className="container">
                    <div className="layout-content">
                        <Outlet />
                    </div>
                </div>
            <Footer />
        </>
     );
}

export default Layout;