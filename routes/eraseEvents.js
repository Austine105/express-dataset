var express = require('express');
var router = express.Router();

const Event = require("../models").Event;

// Route related to delete events
router.delete("/", (req, res) => {
  Event.destroy({
    where: { }
  })
    .then(event => {
      res.json(event);
    })
    .catch(err => res.json(err));
});

module.exports = router;