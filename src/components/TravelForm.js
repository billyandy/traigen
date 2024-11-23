import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #f9f9f9;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    &:focus {
        outline: none;
        border-color: #007BFF;
    }
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;

const PlanContainer = styled.div`
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
`;

const Error = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

const TravelForm = () => {
    const [destination, setDestination] = useState('');
    const [interests, setInterests] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [plan, setPlan] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!destination || !interests || !favoriteFood) {
            setError('All fields are required.');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate-plan', { // Update here for production deployment
                destination,
                interests,
                favorite_food: favoriteFood,
            });
            setPlan(response.data.plan);
        } catch (error) {
            console.error('Error generating plan:', error);
            setError('Failed to generate a travel plan. Please try again.');
        }
    };

    return (
        <Container>
            <Title>Travel Plan Generator</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Enter your Destination (e.g., Paris)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter your Interests (e.g., museums, beaches)"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter your Favorite Food (e.g., sushi)"
                    value={favoriteFood}
                    onChange={(e) => setFavoriteFood(e.target.value)}
                />
                <Button type="submit">Generate Travel Plan</Button>
            </Form>
            {error && <Error>{error}</Error>}
            {plan && (
                <PlanContainer>
                    <h2>Your Travel Plan:</h2>
                    <p>{plan}</p>
                </PlanContainer>
            )}
        </Container>
    );
};

export default TravelForm;