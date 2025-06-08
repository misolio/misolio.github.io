const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// API
app.use('/api/recipes', require('./routes/recipes'));

// Видача статичних файлів з build/
app.use(express.static(path.join(__dirname, 'public')));

// Для всіх інших маршрутів повертаємо index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
