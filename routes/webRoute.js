const express = require('express');
const { runWebProblem } = require('../controllers/webController');

const router = express.Router();

router.post('/run', runWebProblem);

module.exports = router;
