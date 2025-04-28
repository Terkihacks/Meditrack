const express = require('express');
const router = express.Router();

const {createClient,searchClient,getClientProfile} = require('../controllers/clientController');
router.post('/create-client', createClient);
router.get('/search', searchClient);
router.get('/profile/:clientId', getClientProfile);


module.exports = router;