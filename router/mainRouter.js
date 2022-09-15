const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/all-data', mainController.getAllData);
router.get('/film-data', mainController.getFilmsData);
router.get('/seats-data', mainController.getSeatsData);
router.post('/seats-booking', mainController.bookSeats);

module.exports = router;