const express = require('express');
const router = express.Router();
const JeffStokesDDSController = require('./../controllers/JeffStokesDDSController');

router.post('/api/send_email', JeffStokesDDSController.SendEmail);
router.get('/api/test', JeffStokesDDSController.Test);



module.exports = router;