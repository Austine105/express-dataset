var express = require('express');
var router = express.Router();

const Event = require("../models").Event;
const Actor = require("../models").Actor;
const Repo = require("../models").Repo;

// Routes related to event
router.get("/", (req, res) => {
  Event.findAll({
    include: [Actor, Repo],
    order: [['id', 'ASC']]
  })
    .then(events => {
      res.json(events);
    })
    .catch(err => res.json(err));
});


router.get("/actors/:actorId", (req, res) => {
  Event.findAll({
    where: { actorId: req.params.actorId },
    include: [Actor, Repo],
    order: [['id', 'ASC']]
  })
    .then(events => {
      if (events) res.json(events).status(200);
      else res.status(404)
    })
    .catch(err => res.json(err));
});


router.get("/:id", (req, res) => {
  Event.findAll({
    where: { id: req.params.id }
  })
    .then(event => {
      res.json(event[0]);
    })
    .catch(err => res.json(err));
});


router.post("/", (req, res, next) => {
  // console.log('req.body.actor: ' + JSON.stringify(req.body));
  let actorId, repoId = null
  Event.findByPk(req.body.id )
  .then(event => {
    if (event) {
      // console.log('event oo: ' + JSON.stringify(event));
      console.log('event exists!!');
      return res.json().status(400)
    }
    // res.json(event[0]);
    //  else return Actor.create(req.body.actor) // PLEASE USE CREATE IF HERE!!!
     Actor.findOrCreate({where: {id: req.body.actor.id }, 
      defaults: {
        login: req.body.actor.login,
        avatar_url: req.body.actor.avatar_url
      }})
      .then(([actor, created]) => {
        console.log('created actor: ' + JSON.stringify(created));
        actorId = actor.id
        // console.log('created actor: ' + JSON.stringify(actor));
        // return Repo.create(req.body.repo)
         Repo.findOrCreate({where: {id: req.body.repo.id }, 
          defaults: {
            "name": req.body.repo.name,
            "url": req.body.repo.url
          }})
          .then(([repo, created]) => {
            // console.log('created repo: ' + JSON.stringify(repo));
            console.log('created repo: ' + JSON.stringify(created));
            repoId = repo.id
            Event.create({ actorId, repoId,
              id: req.body.id,
              type: req.body.type,
              created_at: req.body.created_at
            })
            .then((event) => {
              // console.log(event.get({ plain: true }))
              // if( created) return res.json().sendStatus(201);
              // return res.json({created}).status((created)? 400: 201);
              console.log('event created')
              return res.json().status(201)
              
            })
          })
      })
  })
  
  
  
  // .catch(err => res.json(err).status(500));
  .catch(err => next(err));
  // .catch(err => console.log('err: ' + JSON.stringify(err)));
});



// router.put("/events/:id", (req, res) => {
//   Event.update({ name: req.body.name }, { where: { id: req.params.id } })
//     .then(updatedPatient => {
//       res.json(updatedPatient);
//     })
//     .catch(err => res.json(err));
// });

// router.delete("/events/:id", (req, res) => {
//   Event.destroy({
//     where: { id: req.params.id }
//   })
//     .then(event => {
//       res.json(event);
//     })
//     .catch(err => res.json(err));
// });



module.exports = router;