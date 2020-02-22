var express = require('express');
var router = express.Router();

const { QueryTypes } = require('sequelize');

const Actor = require("../models").Actor;
const Event = require("../models").Event;

const sequelize = require('../models').sequelize;

// / Routes related to actor.
// console.log('Actor: ' + JSON.stringify(Event));
module.exports = router;

// "id":2790311,
// "login":"daniel33",
// "avatar_url"

// models.modelA.findAll({
//   attributes: [
//      'id'
//   ],
//   raw: true,


// }).then(function (tenants) {

// });


// ANS
// SELECT created_at, COUNT(`Event`.`id`) AS `total_events`, `Actor`.`id` AS `Actor.id`, `Actor`.`login` AS `Actor.login`, `Actor`.`avatar_url` AS `Actor.avatar_url` FROM `Events` AS `Event` LEFT OUTER JOIN `Actors` AS `Actor` ON `Event`.`ActorId` = `Actor`.`id` 
// GROUP BY Actor.id ORDER BY total_events DESC, Event.created_at DESC, login ;



// Returning the actor records ordered by the total number of events: 
// The service should be able to return the JSON array of all the actors sorted by the total number of associated events with each actor in descending order by the GET request at /actors. 
// If there are more than one actors with the same number of events, then order them by the timestamp of the latest event in the descending order. 
// If more than one actors have the same timestamp for the latest event, then order them by the alphabetical order of login. 
// The HTTP response code should be 200.


router.get("/", (req, res) => {

  // let query = "SELECT created_at, COUNT(`Event`.`id`) AS `total_events`, `Actor`.`id` AS `Actor.id`, `Actor`.`login` AS `Actor.login`, `Actor`.`avatar_url` AS `Actor.avatar_url` FROM `Events` AS `Event` LEFT OUTER JOIN `Actors` AS `Actor` ON `Event`.`ActorId` = `Actor`.`id` GROUP BY Actor.id ORDER BY total_events DESC, Event.created_at DESC, login"

  (async function () {
    // Function body
    try {
      const users = await sequelize.query("SELECT created_at, COUNT(`Event`.`id`) AS `total_events`, `Actor`.`id` AS `Actor.id`, `Actor`.`login` AS `Actor.login`, `Actor`.`avatar_url` AS `Actor.avatar_url` FROM `Events` AS `Event` LEFT OUTER JOIN `Actors` AS `Actor` ON `Event`.`ActorId` = `Actor`.`id` GROUP BY Actor.id ORDER BY total_events DESC, Event.created_at DESC, login", { type: QueryTypes.SELECT })
      if (users) res.json(users)
      // console.log('yes');
    }
    catch(err){
      res.json(err)
      // console.log('nooo');
    }

  //   
  })();
  

  // SaleItem.findAll({
  //   attributes: ['itemId', [sequelize.fn('count', sequelize.col('itemId')), 'count']],
  //   group : ['SaleItem.itemId'],
  //   raw: true,
  //   order: sequelize.literal('count DESC')
  // });

  // Event.findAll({
  //   attributes: [ 
  //     // 'id',  
  //     [sequelize.fn('COUNT', sequelize.col('Event.id')), 'no_events'] ],
  //     group: ['id'],
  //   include:
  //   [
  //     {
  //       model: Actor,
  //       attributes: [
  //         'id', 'login', 'avatar_url', // Add column names here inside attributes array.
  //         // [sequelize.fn('COUNT', sequelize.col('id')), 'no_events'],
  //       ]
  //     }
  //   ],
  //   // group: ['no_events'],
  // })
  // .then(actors => {
  //   res.json(actors);
  // })
  // .catch(err => res.json(err));

});

router.get("/:id", (req, res) => {
  Actor.findAll({
    where: { id: req.params.id }
  })
    .then(actor => {
      res.json(actor[0]);
    })
    .catch(err => res.json(err));
});

// router.post("/", (req, res) => {
//   Actor.create({
//     name: req.body.name,
//     id: req.body.id,
//   })
//     .then(res => {
//       res.json(res);
//     })
//     .catch(err => res.json(err));
// });


// /actors. The actor JSON is sent in the request body. If the actor with the id does not exist then the response code should be 404, 
// or if there are other fields being updated for the actor then the HTTP response code should be 400, otherwise, the response code should be 200.
router.put("/", (req, res) => {
  let {id, login, avatar_url } = req.body;
  let fieldChanged = false

  Actor.findByPk(req.body.id)
  .then(actor => {
    if(!actor) return res.json().sendStatus(404)
    if (login && login === actor.login) fieldChanged = true

    // else
    Actor.update({ login, avatar_url }, { where: { id } })
    .then(actor => {
      // if (login) return res.json(actor).status(400);
      res.sendStatus((fieldChanged) ? 400: 200);
    })
  })
  .catch(err => res.json(err));
});