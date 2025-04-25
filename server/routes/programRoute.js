const express = require('express');
const router = express.Router();
const {createProgram} = require('../controllers/programController');

router.post('/create-program', createProgram);

module.exports = router;