const express = require('express');
const router = express.Router();

const {createClient} = require('../controllers/clientController');
router.post('/create-client', createClient);

module.exports = router;