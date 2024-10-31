const express = require('express');
const { validateSql } = require('../controllers/sqlController');

const router = express.Router();

router.post('/', validateSql);

module.exports = router;
