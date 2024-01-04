// Layout.jsx
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import '../style/app.css';

function Layout() {
    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Outlet for rendering child routes */}
            <Outlet />

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2023 Explore Vancouver. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
