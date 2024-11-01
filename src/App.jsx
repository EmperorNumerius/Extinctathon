import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import darkTheme from './theme';
import Leaderboard from './components/Leaderboard';

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/game" element={<GamePage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;