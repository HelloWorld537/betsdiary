const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});