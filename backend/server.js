const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Функция для чтения данных из файла
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return {};
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Функция для записи данных в файл
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Эндпоинт для получения информации о пользователе
app.get('/user/:telegramId', (req, res) => {
  const { telegramId } = req.params;
  const data = readData();
  
  if (data[telegramId]) {
    res.json(data[telegramId]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Эндпоинт для увеличения счётчика пользователя
app.post('/increment', (req, res) => {
  const { telegramId } = req.body;

  if (!telegramId) {
    return res.status(400).json({ message: 'Telegram ID is required' });
  }

  const data = readData();

  if (data[telegramId]) {
    data[telegramId].count += 1;
  } else {
    data[telegramId] = { telegramId, count: 1 };
  }

  writeData(data);
  res.json(data[telegramId]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});