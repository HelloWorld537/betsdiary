const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

const dataFilePath = process.env.DATA_FILE_PATH || 'db.json'; // Использование переменной окружения

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// GET запрос для получения всех ставок
app.get('/api/bets', async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading file');
    }
});

// ... остальные обработчики запросов с использованием dataFilePath

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});