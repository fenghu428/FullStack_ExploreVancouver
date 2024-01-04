import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from './UserContext'; 
import '../style/placedetail.css';

function PlaceDetail() {
    const [place, setPlace] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPlaceAndFavorites = async () => {
            try {
                const placeResponse = await axios.get(`/api/places/${id}`);
                setPlace(placeResponse.data);

                if (user && user._id) {
                    const favoritesResponse = await axios.get(`/api/user/${user._id}/favorites`);
                    const favorites = favoritesResponse.data;
                    setIsFavorite(favorites.some(favorite => favorite._id === id));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlaceAndFavorites();
    }, [id, user]);

    const toggleFavorite = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            await axios({
                method: method,
                url: `/api/user/${user._id}/favorites`,
                data: { itemId: place._id }
            });
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    if (!place) {
        return <div>Loading...</div>;
    }

    return (
        <div className="place-detail">
            <div className="title-and-favorite">
                <h2>{place.title}</h2>
                <span className="save-favorite">
                    Save
                    <FontAwesomeIcon 
                        icon={isFavorite ? solidHeart : regularHeart}
                        className="favorite-icon"
                        onClick={toggleFavorite}
                    />
                </span>
            </div>
            <img src={place.photo} alt={place.title} />
            <h3>Address: {place.address}</h3>
            <p>About: {place.description}</p>
        </div>

    );
}

export default PlaceDetail;
