const express = require('express');
const router = express.Router();

const {createDoctor,loginDoctor} = require('../controllers/doctorController');
router.post('/create-doctor', createDoctor);
router.post('/login', loginDoctor);

module.exports = router;
