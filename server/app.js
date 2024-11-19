const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/cars', carRoutes);

// Export the app
module.exports = app;
