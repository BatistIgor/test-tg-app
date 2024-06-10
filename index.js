const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/statistic', (req, res) => {
    res.sendFile(__dirname + '/public/statistic.html');
});

let counters = {};

app.post('/increment', (req, res) => {
    const userId = req.body.userId;
    console.log(userId);

    if (!userId) {
        return res.status(400).send('userId is required');
    }

    if (!counters[userId]) {
        counters[userId] = 0;
    }

    counters[userId] += 1;

    console.log(Object.keys(counters));
    console.log(counters[userId]);
    res.json({ count: counters[userId] });
});

app.post('/coins', (req, res) => {
    const userId = req.body.userId;
    console.log(userId);

    if (!userId) {
        return res.status(400).send('userId is required');
    }

    if (!counters[userId]) {
        counters[userId] = 0;
    }

    console.log(Object.keys(counters));
    console.log(counters[userId]);
    res.json({ count: counters[userId] });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});