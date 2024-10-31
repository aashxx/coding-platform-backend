const express = require('express');
const { validateDebugging } = require('../controllers/debuggingController');

const router = express.Router();

router.post('/validate', validateDebugging);

module.exports = router;
