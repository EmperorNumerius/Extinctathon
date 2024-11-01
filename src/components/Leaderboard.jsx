import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Paper, Typography } from '@mui/material';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
            const querySnapshot = await getDocs(q);
            const leaderboardData = querySnapshot.docs.map(doc => doc.data());
            setLeaderboard(leaderboardData);
        };
        fetchLeaderboard();
    }, []);

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                <Typography variant="h4" gutterBottom>
                    Leaderboard
                </Typography>
                {leaderboard.map((entry, index) => (
                    <Typography key={index} variant="h6">
                        {index + 1}. {entry.username} - {entry.score}
                    </Typography>
                ))}
            </Paper>
        </Container>
    );
}

export default Leaderboard;