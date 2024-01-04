import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/places.css';

export default function SkiResorts() {
    const [skiresorts, setSkiresorts] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/places?category=skiresort')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSkiresorts(response.data);
                } else {
                    console.error('Expected an array for ski resorts, but received:', response.data);
                }
            })
            .catch(error => console.error('Error fetching ski resorts:', error));
    }, []);

    const handleFavoriteClick = (e, skiresortId) => {
        e.stopPropagation(); 
        toggleFavorite(skiresortId);
    };

    const handlePlaceClick = (skiresortId) => {
        navigate(`/places/${skiresortId}`);
    };

    useEffect(() => {
        if (user && user._id) {
            axios.get(`/api/user/${user._id}/favorites/skiresort`)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        const userFavorites = new Set(response.data.map(fav => fav._id));
                        setFavorites(userFavorites);
                    } else {
                        console.error('Expected an array for favorites, but received:', response.data);
                    }
                })
                .catch(error => console.error('Error fetching user favorites:', error));
        }
    }, [user]);

    const toggleFavorite = async (skiresortId) => {
        if (!user || !user._id) {
            navigate('/login');
            return;
        }

        try {
            const method = favorites.has(skiresortId) ? 'DELETE' : 'POST';
            await axios({
                method: method,
                url: `/api/user/${user._id}/favorites`,
                data: { itemId: skiresortId }
            });

            setFavorites(prevFavorites => {
                const updatedFavorites = new Set(prevFavorites);
                if (method === 'DELETE') {
                    updatedFavorites.delete(skiresortId);
                } else {
                    updatedFavorites.add(skiresortId);
                }
                return updatedFavorites;
            });
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <div className="places-container">
            {skiresorts.map(skiresort => (
                <div key={skiresort._id} className="place" onClick={() => handlePlaceClick(skiresort._id)}>
                    <div className="place-image-container">
                        <img src={skiresort.photo} alt={skiresort.title} className="place-image" />
                        <FontAwesomeIcon 
                            icon={favorites.has(skiresort._id) ? solidHeart : regularHeart}
                            className="favorite-icon"
                            onClick={(e) => handleFavoriteClick(e, skiresort._id)}
                        />
                    </div>
                    <h3>{skiresort.title}</h3>
                    <p>{skiresort.address}</p>
                </div>
            ))}
        </div>
    );
}
