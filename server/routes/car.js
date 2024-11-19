const express = require('express');
const router = express.Router();
const { createCar, getAllCars, getCar, updateCar, deleteCar } = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

// Middleware for authentication
router.use(authMiddleware);

// POST /api/cars - Create a new car
router.post('/', verifyToken, multer().array('images', 10), createCar);

// GET /api/cars - Get all cars of the logged-in user
router.get('/', verifyToken,getAllCars);

// GET /api/cars/:id - Get a particular car by its ID
router.get('/:id',verifyToken, getCar);

// PUT /api/cars/:id - Update car details by ID
router.put('/:id',verifyToken, updateCar);

// DELETE /api/cars/:id - Delete a car by its ID
router.delete('/:id',verifyToken, deleteCar);

module.exports = router;
