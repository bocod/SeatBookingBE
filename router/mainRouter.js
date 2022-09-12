const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/film-data', mainController.getFilmData);
router.get('/seats-data', mainController.getSeatsData);

module.exports = router;