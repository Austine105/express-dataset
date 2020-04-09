'use strict'
const express = require('express');
const router = express.Router();

// user var
const event = require('../controllers/events');


// Routes related to event
router.get("/", event.getAllEvents);

router.get("/actors/:actorId", event.getByActor);

router.post("/", event.addEvent);

router.delete("/", event.eraseEvents);


module.exports = router;