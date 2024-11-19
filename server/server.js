const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();



// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the React app


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Serve Swagger docs (optional)
app.use('/api/docs', express.static('swagger-ui')); // If you use Swagger

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
