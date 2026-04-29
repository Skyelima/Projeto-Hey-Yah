const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');
const authMiddleware = require('../config/authMiddleware');

router.use(authMiddleware);

router.get('/', gamificationController.getProgress);
router.put('/xp', gamificationController.addXP);

module.exports = router;
