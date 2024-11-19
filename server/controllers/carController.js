const Car = require('../models/car');
const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage }).array('images', 10);

// Add a new car
const createCar = async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map((file) => file.path);

  try {
    const newCar = new Car({
      title,
      description,
      tags,
      images,
      user: req.user.id,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all cars by user
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a particular car by ID
const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a car
const updateCar = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;

    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a car
const deleteCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Car.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Car removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createCar, getAllCars, getCar, updateCar, deleteCar };
