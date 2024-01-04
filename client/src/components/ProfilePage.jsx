import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
import '../style/profilepage.css';

export default function ProfilePage() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({
        museums: [],
        parks: [],
        skiresorts: [],
        others: []
    });

    useEffect(() => {
        if (user && user._id) {
            const categories = ['museum', 'park', 'skiresort', 'other'];
            categories.forEach(category => {
                axios.get(`/api/user/${user._id}/favorites/${category}`)
                    .then(response => {
                        setFavorites(prevFavorites => ({
                            ...prevFavorites,
                            [category]: response.data
                        }));
                    })
                    .catch(error => {
                        console.error(`Error fetching ${category} favorites:`, error);
                    });
            });
        }
    }, [user]);

    const handleFavoriteClick = (favoriteId) => {
        navigate(`/places/${favoriteId}`);
    };

    const renderFavoritesList = (category) => {
        const categoryFavorites = favorites[category];
        if (!categoryFavorites || categoryFavorites.length === 0) {
            return <p>No favorites in this category.</p>;
        }

        return categoryFavorites.map((favorite) => (
            <div 
                key={favorite._id} 
                className="favorite-item" 
                onClick={() => handleFavoriteClick(favorite._id, category)}
            >
                <img src={favorite.photo} alt={favorite.title} />
                <div className="favorite-details">
                    <h4>{favorite.title}</h4>
                    <p>Address: {favorite.address}</p>
                </div>
            </div>
        ));
    };

    const handleLogout = () => {
        setUser(null); 
        navigate('/login');
    };

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>

            <h3>Your Favorite Museums</h3>
            <div className="favorites-list">{renderFavoritesList('museum')}</div>

            <h3>Your Favorite Parks</h3>
            <div className="favorites-list">{renderFavoritesList('park')}</div>

            <h3>Your Favorite Ski Resorts</h3>
            <div className="favorites-list">{renderFavoritesList('skiresort')}</div>

            <h3>Your Favorite Others</h3>
            <div className="favorites-list">{renderFavoritesList('other')}</div>

            <button onClick={handleLogout} className="logout-button">Log out</button>
        </div>
    );
}
