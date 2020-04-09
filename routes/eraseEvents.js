'use strict'
const express = require('express');
const router = express.Router();

// user var
const event = require('../controllers/events');


// Routes related to eraseEvents
router.delete("/", event.eraseEvents);


module.exports = router;