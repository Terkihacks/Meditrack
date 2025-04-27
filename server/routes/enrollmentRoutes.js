const express = require('express');
const router = express.Router();
const {createEnrollment} = require('../controllers/enrollmentController');
const {verifyToken} = require('../middleware/doctorMiddleware');

router.post('/create',verifyToken,createEnrollment);

module.exports = router;
