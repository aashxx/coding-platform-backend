const express = require('express');
const { validateSql } = require('../controllers/sqlController');

const router = express.Router();

router.post('/validate', validateSql);

module.exports = router;
