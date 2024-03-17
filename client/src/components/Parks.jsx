import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/places.css';

export default function Parks() {
    const [parks, setParks] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/places?category=park');
                setParks(response.data);
            } catch (error) {
                console.error('Error fetching parks:', error);
            }
        })();
    }, []);

    const handleFavoriteClick = (e, parkId) => {
        e.stopPropagation(); 
        toggleFavorite(parkId);
    };

    const handlePlaceClick = (parkId) => {
        navigate(`/places/${parkId}`);
    };

    useEffect(() => {
        if (user && user._id) {
            axios.get(`/api/user/${user._id}/favorites/park`)
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

    const toggleFavorite = async (parkId) => {
        if (!user || !user._id) {
            navigate('/login'); 
            return;
        }

        try {
            const method = favorites.has(parkId) ? 'DELETE' : 'POST';
            await axios({
                method: method,
                url: `/api/user/${user._id}/favorites`,
                data: { itemId: parkId }
            });

            setFavorites(prevFavorites => {
                const updatedFavorites = new Set(prevFavorites);
                if (method === 'DELETE') {
                    updatedFavorites.delete(parkId);
                } else {
                    updatedFavorites.add(parkId);
                }
                return updatedFavorites;
            });
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };
    
    return (
        <div className="places-container">
            {parks.map(park => (
                <div key={park._id} className="place" onClick={() => handlePlaceClick(park._id)}>
                    <div className="place-image-container">
                        <img src={park.photo} alt={park.title} className="place-image" loading="lazy" />
                        <FontAwesomeIcon 
                            icon={favorites.has(park._id) ? solidHeart : regularHeart}
                            className="favorite-icon"
                            onClick={(e) => handleFavoriteClick(e, park._id)}
                        />
                    </div>
                    <h3>{park.title}</h3>
                    <p>{park.address}</p>
                </div>
            ))}
        </div>
    );
}
