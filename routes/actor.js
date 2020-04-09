'use strict'
const express = require('express');
const router = express.Router();

const actor = require('../controllers/actors')


// Routes related to actors
router.get("/", actor.getAllActors);

router.put("/", actor.updateActor);

router.get("/streak", actor.getStreak);


module.exports = router;