const express = require('express');
const router = express.Router();
const {createEnrollment} = require('../controllers/enrollmentController');
const verifyDoc = require('../middleware/doctorMiddleware');

router.post('/create',verifyDoc,createEnrollment);

module.exports = router;
