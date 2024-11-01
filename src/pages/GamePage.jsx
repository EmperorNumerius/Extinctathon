import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import RoomSelection from '../components/RoomSelection';
import Game from '../components/Game';

function GamePage() {
    const [room, setRoom] = useState(null);

    const handleRoomSelect = (selectedRoom) => {
        setRoom(selectedRoom);
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            {room ? (
                <Game room={room} />
            ) : (
                <RoomSelection onRoomSelect={handleRoomSelect} />
            )}
        </Container>
    );
}

export default GamePage;
