const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/film-data', mainController.getFilmsData);
router.get('/seats-data', mainController.getSeatsData);
router.post('/book-seat', mainController.bookSeats);

module.exports = router;