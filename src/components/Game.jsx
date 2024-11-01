import React, { useState, useEffect } from 'react';
import { TextField, Typography, Container, Paper, Button, Chip, Box, CircularProgress } from '@mui/material';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import AnimalCard from './AnimalCard';

const animals = [
    { name: 'Dodo', legs: 2, phylum: 'Chordata', class: 'Aves', order: 'Columbiformes', family: 'Columbidae', genus: 'Raphus', species: 'cucullatus', habitat: 'Mauritius', lastSeen: '1662', cause: 'Hunting and habitat destruction' },
    { name: 'Passenger Pigeon', legs: 2, phylum: 'Chordata', class: 'Aves', order: 'Columbiformes', family: 'Columbidae', genus: 'Ectopistes', species: 'migratorius', habitat: 'North America', lastSeen: '1914', cause: 'Hunting and habitat destruction' },
    { name: 'Tasmanian Tiger', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Dasyuromorphia', family: 'Thylacinidae', genus: 'Thylacinus', species: 'cynocephalus', habitat: 'Australia', lastSeen: '1936', cause: 'Hunting and habitat destruction' },
    { name: 'Steller\'s Sea Cow', legs: 0, phylum: 'Chordata', class: 'Mammalia', order: 'Sirenia', family: 'Dugongidae', genus: 'Hydrodamalis', species: 'gigas', habitat: 'Bering Sea', lastSeen: '1768', cause: 'Hunting' },
    { name: 'Great Auk', legs: 2, phylum: 'Chordata', class: 'Aves', order: 'Charadriiformes', family: 'Alcidae', genus: 'Pinguinus', species: 'impennis', habitat: 'North Atlantic', lastSeen: '1844', cause: 'Hunting and habitat destruction' },
    { name: 'Quagga', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Equidae', genus: 'Equus', species: 'quagga', habitat: 'South Africa', lastSeen: '1883', cause: 'Hunting and habitat destruction' },
    { name: 'Carolina Parakeet', legs: 2, phylum: 'Chordata', class: 'Aves', order: 'Psittaciformes', family: 'Psittacidae', genus: 'Conuropsis', species: 'carolinensis', habitat: 'Eastern United States', lastSeen: '1918', cause: 'Hunting and habitat destruction' },
    { name: 'Golden Toad', legs: 4, phylum: 'Chordata', class: 'Amphibia', order: 'Anura', family: 'Bufonidae', genus: 'Incilius', species: 'periglenes', habitat: 'Costa Rica', lastSeen: '1989', cause: 'Climate change and habitat destruction' },
    { name: 'Pyrenean Ibex', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Bovidae', genus: 'Capra', species: 'pyrenaica', habitat: 'Pyrenees Mountains', lastSeen: '2000', cause: 'Hunting and habitat destruction' },
    { name: 'Baiji', legs: 0, phylum: 'Chordata', class: 'Mammalia', order: 'Cetacea', family: 'Lipotidae', genus: 'Lipotes', species: 'vexillifer', habitat: 'Yangtze River', lastSeen: '2006', cause: 'Pollution and habitat destruction' },
    { name: 'West African Black Rhino', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Rhinocerotidae', genus: 'Diceros', species: 'bicornis', habitat: 'West Africa', lastSeen: '2011', cause: 'Poaching' },
    { name: 'Pinta Island Tortoise', legs: 4, phylum: 'Chordata', class: 'Reptilia', order: 'Testudines', family: 'Testudinidae', genus: 'Chelonoidis', species: 'abingdonii', habitat: 'Pinta Island, Galapagos', lastSeen: '2012', cause: 'Hunting and habitat destruction' },
    { name: 'Formosan Clouded Leopard', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Neofelis', species: 'nebulosa', habitat: 'Taiwan', lastSeen: 'Unknown', cause: 'Habitat destruction' },
    { name: 'Javan Tiger', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'tigris', habitat: 'Java, Indonesia', lastSeen: '1979', cause: 'Hunting and habitat destruction' },
    { name: 'Caspian Tiger', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'tigris', habitat: 'Caspian Sea region', lastSeen: '1970', cause: 'Hunting and habitat destruction' },
    { name: 'Bali Tiger', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'tigris', habitat: 'Bali, Indonesia', lastSeen: '1937', cause: 'Hunting and habitat destruction' },
    { name: 'Saber-toothed Cat', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Smilodon', species: 'fatalis', habitat: 'North and South America', lastSeen: '10,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Woolly Mammoth', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Proboscidea', family: 'Elephantidae', genus: 'Mammuthus', species: 'primigenius', habitat: 'Northern Hemisphere', lastSeen: '4,000 years ago', cause: 'Climate change and hunting' },
    { name: 'Irish Elk', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Cervidae', genus: 'Megaloceros', species: 'giganteus', habitat: 'Eurasia', lastSeen: '7,700 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Dire Wolf', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Canidae', genus: 'Canis', species: 'dirus', habitat: 'North and South America', lastSeen: '10,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Giant Ground Sloth', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Megatheriidae', genus: 'Megatherium', species: 'americanum', habitat: 'South America', lastSeen: '10,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Glyptodon', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Cingulata', family: 'Glyptodontidae', genus: 'Glyptodon', species: 'clavipes', habitat: 'South America', lastSeen: '10,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Moa', legs: 2, phylum: 'Chordata', class: 'Aves', order: 'Dinornithiformes', family: 'Dinornithidae', genus: 'Dinornis', species: 'robustus', habitat: 'New Zealand', lastSeen: '1500', cause: 'Hunting and habitat destruction' },
    { name: 'Haast\'s Eagle', legs: 2, phylum: 'Chordata', class: 'Aves', order: 'Accipitriformes', family: 'Accipitridae', genus: 'Harpagornis', species: 'moorei', habitat: 'New Zealand', lastSeen: '1400', cause: 'Hunting and habitat destruction' },
    { name: 'Thylacoleo', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Diprotodontia', family: 'Thylacoleonidae', genus: 'Thylacoleo', species: 'carnifex', habitat: 'Australia', lastSeen: '46,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megatherium', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Megatheriidae', genus: 'Megatherium', species: 'americanum', habitat: 'South America', lastSeen: '10,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megalania', legs: 4, phylum: 'Chordata', class: 'Reptilia', order: 'Squamata', family: 'Varanidae', genus: 'Varanus', species: 'priscus', habitat: 'Australia', lastSeen: '40,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megaloceros', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Cervidae', genus: 'Megaloceros', species: 'giganteus', habitat: 'Eurasia', lastSeen: '7,700 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megalodon', legs: 0, phylum: 'Chordata', class: 'Chondrichthyes', order: 'Lamniformes', family: 'Otodontidae', genus: 'Carcharocles', species: 'megalodon', habitat: 'Worldwide oceans', lastSeen: '2.6 million years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megacerops', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Brontotheriidae', genus: 'Megacerops', species: 'coloradensis', habitat: 'North America', lastSeen: '34 million years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megalonyx', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Megalonychidae', genus: 'Megalonyx', species: 'jeffersonii', habitat: 'North America', lastSeen: '11,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Meganeura', legs: 6, phylum: 'Arthropoda', class: 'Insecta', order: 'Meganisoptera', family: 'Meganeuridae', genus: 'Meganeura', species: 'monyi', habitat: 'Europe', lastSeen: '300 million years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megatherium', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Megatheriidae', genus: 'Megatherium', species: 'americanum', habitat: 'South America', lastSeen: '10,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megalania', legs: 4, phylum: 'Chordata', class: 'Reptilia', order: 'Squamata', family: 'Varanidae', genus: 'Varanus', species: 'priscus', habitat: 'Australia', lastSeen: '40,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megaloceros', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Cervidae', genus: 'Megaloceros', species: 'giganteus', habitat: 'Eurasia', lastSeen: '7,700 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megalodon', legs: 0, phylum: 'Chordata', class: 'Chondrichthyes', order: 'Lamniformes', family: 'Otodontidae', genus: 'Carcharocles', species: 'megalodon', habitat: 'Worldwide oceans', lastSeen: '2.6 million years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megacerops', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Brontotheriidae', genus: 'Megacerops', species: 'coloradensis', habitat: 'North America', lastSeen: '34 million years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Megalonyx', legs: 4, phylum: 'Chordata', class: 'Mammalia', order: 'Pilosa', family: 'Megalonychidae', genus: 'Megalonyx', species: 'jeffersonii', habitat: 'North America', lastSeen: '11,000 years ago', cause: 'Climate change and habitat destruction' },
    { name: 'Meganeura', legs: 6, phylum: 'Arthropoda', class: 'Insecta', order: 'Meganisoptera', family: 'Meganeuridae', genus: 'Meganeura', species: 'monyi', habitat: 'Europe', lastSeen: '300 million years ago', cause: 'Climate change and habitat destruction' },
];

function Game({ room, username }) {
    const [currentAnimal, setCurrentAnimal] = useState(animals[Math.floor(Math.random() * animals.length)]);
    const [computerAnimal, setComputerAnimal] = useState(animals[Math.floor(Math.random() * animals.length)]);
    const [guesses, setGuesses] = useState([]);
    const [computerGuesses, setComputerGuesses] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [score, setScore] = useState(0);
    const [correctGuesses, setCorrectGuesses] = useState({});
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
    const [hints, setHints] = useState(3); // 3 hints available
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        if (!gameOver && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    useEffect(() => {
        if (!gameOver) {
            const computerGuess = simulateComputerGuess(computerAnimal);
            setComputerGuesses([...computerGuesses, computerGuess]);
        }
    }, [guesses]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(10));
            const querySnapshot = await getDocs(q);
            const leaderboardData = querySnapshot.docs.map(doc => doc.data());
            setLeaderboard(leaderboardData);
        };
        fetchLeaderboard();
    }, []);

    const handleGuess = (guess) => {
        if (!startTime) {
            setStartTime(new Date());
        }
        const isCorrect = checkGuess(guess, currentAnimal);
        setGuesses([...guesses, { guess, isCorrect }]);
        if (isCorrect) {
            setCorrectGuesses({ ...correctGuesses, [guess.split(':')[0].trim()]: guess.split(':')[1].trim() });
        }
        if (Object.keys(correctGuesses).length >= 5) {
            const finalGuess = makeFinalGuess(correctGuesses);
            if (finalGuess.toLowerCase() === currentAnimal.name.toLowerCase()) {
                const endTime = new Date();
                const timeTaken = (endTime - startTime) / 1000; // Time in seconds
                const score = calculateScore(timeTaken, guesses.length + 1);
                setScore(score);
                setGameOver(true);
                saveScore(score);
            }
        }
    };

    const simulateComputerGuess = (animal) => {
        const possibleGuesses = [
            `Legs: ${animal.legs}`,
            `Phylum: ${animal.phylum}`,
            `Class: ${animal.class}`,
            `Order: ${animal.order}`,
            `Family: ${animal.family}`,
            `Genus: ${animal.genus}`,
            `Species: ${animal.species}`,
            `Habitat: ${animal.habitat}`,
            `Last Seen: ${animal.lastSeen}`,
            `Cause of Extinction: ${animal.cause}`
        ];
        const guess = possibleGuesses[Math.floor(Math.random() * possibleGuesses.length)];
        const isCorrect = checkGuess(guess, animal);
        setComputerGuesses([...computerGuesses, { guess, isCorrect }]);
        if (isCorrect) {
            setCorrectGuesses({ ...correctGuesses, [guess.split(':')[0].trim()]: guess.split(':')[1].trim() });
        }
        return guess;
    };

    const checkGuess = (guess, animal) => {
        const [key, value] = guess.split(':').map(part => part.trim());
        return animal[key.toLowerCase()] === value;
    };

    const makeFinalGuess = (correctGuesses) => {
        const possibleAnimals = animals.filter(animal => {
            return Object.keys(correctGuesses).every(key => {
                return animal[key.toLowerCase()] === correctGuesses[key];
            });
        });
        return possibleAnimals.length === 1 ? possibleAnimals[0].name : 'Unknown';
    };

    const calculateScore = (timeTaken, numGuesses) => {
        const timeScore = Math.max(0, 100 - timeTaken);
        const guessScore = Math.max(0, 100 - numGuesses * 10);
        return Math.round((timeScore + guessScore) / 2);
    };

    const getHint = () => {
        if (hints > 0) {
            const hint = getRandomHint(computerAnimal);
            setHints(hints - 1);
            alert(`Hint: ${hint}`);
        }
    };

    const getRandomHint = (animal) => {
        const possibleHints = [
            `Legs: ${animal.legs}`,
            `Phylum: ${animal.phylum}`,
            `Class: ${animal.class}`,
            `Order: ${animal.order}`,
            `Family: ${animal.family}`,
            `Genus: ${animal.genus}`,
            `Species: ${animal.species}`,
            `Habitat: ${animal.habitat}`,
            `Last Seen: ${animal.lastSeen}`,
            `Cause of Extinction: ${animal.cause}`
        ];
    return possibleHints[Math.floor(Math.random() * possibleHints.length)];
};
    const saveScore = async (score) => {
        try {
            await addDoc(collection(db, 'leaderboard'), {
                username: username || 'Anonymous',
                score,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    const restartGame = () => {
        setCurrentAnimal(animals[Math.floor(Math.random() * animals.length)]);
        setComputerAnimal(animals[Math.floor(Math.random() * animals.length)]);
        setGuesses([]);
        setComputerGuesses([]);
        setGameOver(false);
        setStartTime(null);
        setScore(0);
        setCorrectGuesses({});
        setTimeLeft(60);
        setHints(3);
    };

    return (
        <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Box display="flex" justifyContent="center">
                <Box flex={1} marginRight="20px">
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff'}}>
                        <Typography variant="h5" gutterBottom>
                            Your Guesses
                        </Typography>
                        {guesses.map(({ guess, isCorrect }, index) => (
                            <Chip
                                key={index}
                                label={guess}
                                color={isCorrect ? 'primary' : 'error'}
                                variant="outlined"
                                style={{ margin: '5px', borderColor: isCorrect ? '#bb86fc' : '#f44336' }}
                            />
                        ))}
                    </Paper>
                </Box>
                <Box flex={2} display="flex" flexDirection="center" alignItems="center">
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff', width: "100%" }}>
                        <Typography variant="h4" gutterBottom sx={{ textShadow: '2px 2px 4px #ff5722' }}>
                            {room}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Time Left: {timeLeft} seconds
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Hints: {hints}
                        </Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <AnimalCard animal={currentAnimal} />
                        </Box>
                        <TextField
                            label="Enter your guess"
                            variant="outlined"
                            fullWidth
                            onKeyPress={(e) => e.key === 'Enter' && handleGuess(e.target.value)}
                            style={{ marginTop: '20px' }}
                            disabled={gameOver}
                        />
                        <Button variant="contained" color="secondary" onClick={getHint} style={{ marginTop: '20px' }} disabled={gameOver}>
                            Get Hint
                        </Button>
                        {gameOver && (
                            <div style={{ marginTop: '20px' }}>
                                <Typography variant="h5" gutterBottom>
                                    {timeLeft === 0 ? 'Time is up!' : 'Congratulations! You guessed the animal correctly.'}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    Your Score: {score}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    The animal was: {currentAnimal.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    The computer's animal was: {computerAnimal.name}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={restartGame} style={{ marginTop: '20px' }}>
                                    Restart Game
                                </Button>
                            </div>
                        )}
                    </Paper>
                </Box>
                <Box flex={1} marginLeft="20px">
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                        <Typography variant="h5" gutterBottom>
                            Computer Guesses
                        </Typography>
                        {computerGuesses.map(({ guess, isCorrect }, index) => (
                            <Chip
                                key={index}
                                label={guess}
                                color={isCorrect ? 'primary' : 'error'}
                                variant="outlined"
                                style={{ margin: '5px', borderColor: isCorrect ? '#bb86fc' : '#f44336' }}
                            />
                        ))}
                    </Paper>
                </Box>
            </Box>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#ffffff', marginTop: '20px' }}>
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

export default Game;