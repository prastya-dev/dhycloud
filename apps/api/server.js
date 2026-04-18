require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API DHYCLOUD RUNNING');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);