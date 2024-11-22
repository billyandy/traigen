import React, { useState } from 'react';
import axios from 'axios';

const TravelForm = () => {
    const [location, setLocation] = useState('');
    const [interests, setInterests] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [plan, setPlan] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate-plan', {
                location,
                interests,
                favorite_food: favoriteFood,
            });
            setPlan(response.data.plan);
        } catch (error) {
            console.error('Error generating plan:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your favorite food"
                    value={favoriteFood}
                    onChange={(e) => setFavoriteFood(e.target.value)}
                />
                <button type="submit">Generate Travel Plan</button>
            </form>
            {plan && <div><h2>Your Travel Plan:</h2><p>{plan}</p></div>}
        </div>
    );
};

export default TravelForm;