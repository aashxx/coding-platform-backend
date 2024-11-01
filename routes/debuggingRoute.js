const express = require('express');
const { runDebuggingProblem } = require('../controllers/debuggingController');

const router = express.Router();

router.post('/run', runDebuggingProblem);

module.exports = router;
