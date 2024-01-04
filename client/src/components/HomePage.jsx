import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style/app.css';

const imageList = [
    '/stanley-park.jpeg',
    '/city.jpeg',
    '/science-world.jpeg',
];

function ImageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageList.length);
            setSlideDirection('left');
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleImageChange = (direction) => {
        setSlideDirection(direction);
        setCurrentImageIndex(prevIndex => 
            direction === 'left'
                ? (prevIndex + 1) % imageList.length
                : (prevIndex - 1 + imageList.length) % imageList.length
        );
        setTimeout(() => setSlideDirection(null), 500);
    };

    return (
        <div className="image-container">
            <button onClick={() => handleImageChange('left')} className="nav-button left">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <img
                src={imageList[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className={`full-width-image ${slideDirection}`}
            />
            <button onClick={() => handleImageChange('right')} className="nav-button right">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [featuredPlaces, setFeaturedPlaces] = useState([]);

    useEffect(() => {
        const fetchFeaturedPlaces = async () => {
            try {
                const ids = ['658d21878ee5ff93196e3485', '658d21e58ee5ff93196e348a', '658d22de8ee5ff93196e34a2', '658d22f08ee5ff93196e34a4', '658d24d38ee5ff93196e34c0', '658d25628ee5ff93196e34cc'];
                const response = await axios.get('/api/places', { params: { ids: ids } });
                setFeaturedPlaces(response.data);
            } catch (error) {
                console.error('Error fetching featured places:', error);
            }
        };

        fetchFeaturedPlaces();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/api/places?search=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="search-bar">
                <div className="search-icon-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search attractions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="search-results">
                {searchResults.map(place => (
                    <Link to={`/places/${place._id}`} key={place._id} className="search-result-item">
                        <img src={place.photo} alt={place.title} className="place-image" />
                        <div className="search-result-details">
                            <h4>{place.title}</h4>
                            <p>Address: {place.address}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <ImageCarousel />

            {/* Heading for Popular Attractions */}
            <h2 className="popular-attractions-title">Popular Attractions In Vancouver</h2>
            <div className="featured-places">
                {featuredPlaces.map(place => (
                    <Link to={`/places/${place._id}`} key={place._id} className="featured-place-item">
                        <img src={place.photo} alt={place.title} className="place-image" />
                        <div className="featured-place-details">
                            <h4>{place.title}</h4>
                            <p>Address: {place.address}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );  
}

export default HomePage;
