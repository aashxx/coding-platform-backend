const express = require('express');
const { validateWeb } = require('../controllers/webController');

const router = express.Router();

router.post('/', validateWeb);

module.exports = router;
