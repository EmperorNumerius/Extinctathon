import React from 'react';
import { Button, Typography } from '@mui/material';

function RoomSelection({ onRoomSelect }) {
    const handleSelectRoom = (room) => {
        onRoomSelect(room);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Select a Room
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleSelectRoom('Kingdom Animal')}>
                Kingdom Animal
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleSelectRoom('Kingdom Vegetable')}>
                Kingdom Vegetable
            </Button>
        </div>
    );
}

export default RoomSelection;
