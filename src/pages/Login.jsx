import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim()) {
            signInAnonymously(auth)
                .then(() => {
                    navigate('/game', { state: { username } });
                })
                .catch((error) => {
                    console.error('Error signing in anonymously:', error);
                });
        }
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Enter your name"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginTop: '20px' }}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px' }}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;