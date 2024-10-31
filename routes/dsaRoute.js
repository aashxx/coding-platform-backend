const express = require('express');
const { validateDsa } = require('../controllers/dsaController');

const router = express.Router();

router.post('/validate', validateDsa);

module.exports = router;
