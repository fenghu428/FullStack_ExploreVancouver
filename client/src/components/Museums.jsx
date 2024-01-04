import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/places.css';

export default function Museums() {
    const [museums, setMuseums] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/places?category=museum')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setMuseums(response.data);
                } else {
                    console.error('Expected an array for museums, but received:', response.data);
                }
            })
            .catch(error => console.error('Error fetching museums:', error));
    }, []);

    const handleFavoriteClick = (e, museumId) => {
        e.stopPropagation(); 
        toggleFavorite(museumId);
    };

    const handlePlaceClick = (museumId) => {
        navigate(`/places/${museumId}`);
    };

    useEffect(() => {
        if (user && user._id) {
            axios.get(`/api/user/${user._id}/favorites/museum`)
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

    const toggleFavorite = async (museumId) => {
        if (!user || !user._id) {
            navigate('/login');
            return;
        }

        try {
            const method = favorites.has(museumId) ? 'DELETE' : 'POST';
            await axios({
                method: method,
                url: `/api/user/${user._id}/favorites`,
                data: { itemId: museumId }
            });

            setFavorites(prevFavorites => {
                const updatedFavorites = new Set(prevFavorites);
                if (method === 'DELETE') {
                    updatedFavorites.delete(museumId);
                } else {
                    updatedFavorites.add(museumId);
                }
                return updatedFavorites;
            });
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (
        <div className="places-container">
            {museums.map(museum => (
                <div key={museum._id} className="place" onClick={() => handlePlaceClick(museum._id)}>
                    <div className="place-image-container">
                        <img src={museum.photo} alt={museum.title} className="place-image" />
                        <FontAwesomeIcon 
                            icon={favorites.has(museum._id) ? solidHeart : regularHeart}
                            className="favorite-icon"
                            onClick={(e) => handleFavoriteClick(e, museum._id)}
                        />
                    </div>
                    <h3>{museum.title}</h3>
                    <p>{museum.address}</p>
                </div>
            ))}
        </div>
    );
}
