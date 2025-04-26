const express = require('express');
const router = express.Router();

const {createClient,searchClient} = require('../controllers/clientController');
router.post('/create-client', createClient);
router.get('/search', searchClient);


module.exports = router;