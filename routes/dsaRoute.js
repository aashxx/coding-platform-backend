const express = require('express');
const { runDSAProblem } = require('../controllers/dsaController');

const router = express.Router();

router.post('/run', runDSAProblem);

module.exports = router;
