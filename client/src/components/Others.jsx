import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/places.css';

export default function Others() {
    const [others, setOthers] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/places?category=other');
                setOthers(response.data);
            } catch (error) {
                console.error('Error fetching ski others:', error);
            }
        })();
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

    const toggleFavorite = async (otherId) => {
        if (!user || !user._id) {
            navigate('/login');
            return;
        }

        try {
            const method = favorites.has(otherId) ? 'DELETE' : 'POST';
            await axios({
                method: method,
                url: `/api/user/${user._id}/favorites`,
                data: { itemId: otherId }
            });

            setFavorites(prevFavorites => {
                const updatedFavorites = new Set(prevFavorites);
                if (method === 'DELETE') {
                    updatedFavorites.delete(otherId);
                } else {
                    updatedFavorites.add(otherId);
                }
                return updatedFavorites;
            });
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <div className="places-container">
            {others.map(other => (
                <div key={other._id} className="place" onClick={() => handlePlaceClick(other._id)}>
                    <div className="place-image-container">
                        <img src={other.photo} alt={other.title} className="place-image" loading="lazy" />
                        <FontAwesomeIcon 
                            icon={favorites.has(other._id) ? solidHeart : regularHeart}
                            className="favorite-icon"
                            onClick={(e) => handleFavoriteClick(e, other._id)}
                        />
                    </div>
                    <h3>{other.title}</h3>
                    <p>{other.address}</p>
                </div>
            ))}
        </div>
    );
}
