import React, { useState, useEffect } from 'react';
import './Slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllCategories() {
            try {
                const response = await axios.get("http://localhost:3000/api/photo/getAllCategories");
                if (response.data.categories) {
                    setCategories(response.data.categories);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        getAllCategories();
    }, []);

    const handleScroll = (direction) => {
        if (direction === 'left') {
            setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : categories.length - 1));
        } else {
            setCurrentIndex(prevIndex => (prevIndex < categories.length - 1 ? prevIndex + 1 : 0));
        }
    };

    return (
        <div className='k_body'>
            <div className="k_wrapper">
                <button className="scroll-button left" onClick={() => handleScroll('left')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <ul className="k_carousel">
                    {isLoaded && categories.slice(currentIndex, currentIndex + 3).map((category, index) => (
                        <li className='k_card' key={index} onClick={() => navigate("/category/" + category)}>
                            <img className="img" src={`../../images/Photos/${category}.jpg`} alt={category} />
                            <h2>{category}</h2>
                        </li>
                    ))}
                </ul>
                <button className="scroll-button right" onClick={() => handleScroll('right')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}

export default Slider;
