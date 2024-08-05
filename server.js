const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0'; // Listen on all interfaces by default

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// GET запрос для получения всех ставок
app.get('/api/bets', async (req, res) => {
    try {
        const data = await fs.readFile('db.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).send('Error reading file');
    }
});

// POST запрос для добавления новой ставки
app.post('/api/bets', async (req, res) => {
    try {
        const data = await fs.readFile('db.json', 'utf8');
        const bets = JSON.parse(data);
        bets.push(req.body);
        await fs.writeFile('db.json', JSON.stringify(bets, null, 2));
        res.status(201).send('Bet added successfully');
    } catch (error) {
        res.status(500).send('Error writing file');
    }
});

// DELETE запрос для удаления ставки
app.delete('/api/bets/:id', async (req, res) => {
    try {
        const data = await fs.readFile('db.json', 'utf8');
        let bets = JSON.parse(data);
        const id = parseInt(req.params.id);
        console.log('Received delete request for id:', id);
        const initialLength = bets.length;
        bets = bets.filter(bet => bet.id !== id);

        if (bets.length === initialLength) {
            return res.status(404).send('Bet not found');
        }

        await fs.writeFile('db.json', JSON.stringify(bets, null, 2));
        res.status(200).send('Bet deleted successfully');
    } catch (error) {
        console.error('Error in delete route:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});