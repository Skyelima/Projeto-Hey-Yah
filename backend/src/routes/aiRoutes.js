const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../config/authMiddleware');

router.use(authMiddleware);

router.post('/suggestions', aiController.generateSuggestions);

module.exports = router;
