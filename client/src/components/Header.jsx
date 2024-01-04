// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLandmark, faTree, faSnowflake, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import '../style/app.css';

function Header() {
    const {user} = useContext(UserContext);

    return (
        <header>
            <div className="header--main__nav">
                <Link to="/" className="header-name">
                    <h1>Explore Vancouver</h1>
                </Link>
                <Link to={user?'/account':'/login'}>
                    <div className="icon-container">
                        <div className="circle-icon">
                            <FontAwesomeIcon icon={faBars} />
                            <FontAwesomeIcon icon={faUser} />
                            {!!user && (
                                <div className="user-name">
                                    {user.name}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>

            <div className="header-links">
                <nav className="menu">
                    <ul className="menu-list">
                        <li>
                            <Link to="/museums">
                                <FontAwesomeIcon icon={faLandmark} className="menu-icon" /> Museums
                            </Link>
                        </li>
                        <li>
                            <Link to="/parks">
                                <FontAwesomeIcon icon={faTree} className="menu-icon" /> Parks
                            </Link>
                        </li>
                        <li>
                            <Link to="/ski-resorts">
                                <FontAwesomeIcon icon={faSnowflake} className="menu-icon" /> Ski Resorts
                            </Link>
                        </li>
                        <li>
                            <Link to="/others">
                                <FontAwesomeIcon icon={faEllipsisV} className="menu-icon" /> Others
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
