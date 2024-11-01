import React from 'react';
import { Paper, Typography } from '@mui/material';

function AnimalCard({ animal }) {
    return (
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
                {animal.name}
            </Typography>
            <Typography variant="body1">
                Legs: {animal.legs}
            </Typography>
            <Typography variant="body1">
                Phylum: {animal.phylum}
            </Typography>
            <Typography variant="body1">
                Class: {animal.class}
            </Typography>
            <Typography variant="body1">
                Order: {animal.order}
            </Typography>
            <Typography variant="body1">
                Family: {animal.family}
            </Typography>
            <Typography variant="body1">
                Genus: {animal.genus}
            </Typography>
            <Typography variant="body1">
                Species: {animal.species}
            </Typography>
            <Typography variant="body1">
                Habitat: {animal.habitat}
            </Typography>
            <Typography variant="body1">
                Last Seen: {animal.lastSeen}
            </Typography>
            <Typography variant="body1">
                Cause of Extinction: {animal.cause}
            </Typography>
        </Paper>
    );
}

export default AnimalCard;
