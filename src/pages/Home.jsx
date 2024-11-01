import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

function Home() {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate('/game');
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                EXTINCTATHON
            </Typography>
            <Typography variant="body1" gutterBottom>
                Monitored by MaddAddam. Adam named the living animals, MaddAddam names the dead ones. Do you want to play?
            </Typography>
            <Button variant="contained" color="primary" onClick={handleStartGame}>
                Yes
            </Button>
        </Container>
    );
}

export default Home;
