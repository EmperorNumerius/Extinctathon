import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import RoomSelection from '../components/RoomSelection';
import Game from '../components/Game';

function GamePage() {
    const [room, setRoom] = useState(null);
    const location = useLocation();
    const { username } = location.state || {};

    const handleRoomSelect = (selectedRoom) => {
        setRoom(selectedRoom);
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            {room ? (
                <Game room={room} username={username} />
            ) : (
                <RoomSelection onRoomSelect={handleRoomSelect} />
            )}
        </Container>
    );
}

export default GamePage;