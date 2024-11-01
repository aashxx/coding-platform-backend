const express = require('express');
const { runSQLProblem } = require('../controllers/sqlController');

const router = express.Router();

router.post('/run', runSQLProblem);

module.exports = router;
