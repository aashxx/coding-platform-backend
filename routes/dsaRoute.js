const express = require('express');
const { validateDsa } = require('../controllers/dsaController');

const router = express.Router();

router.post('/', validateDsa);

module.exports = router;
