var express = require('express');
var router = express.Router();

const Event = require("../models").Event;

// Routes related to event
router.get("/", (req, res, next) => {
  Event.findAll({
    order: [['id', 'ASC']]
  })
    .then(events => {

      const eventData = events.map(event => {
        return {
          id: event.id,
          type: event.type,
          actor: {
            id: event.actor_id,
            login: event.actor_login,
            avatar_url: event.actor_avatar_url
          },
          repo: {
            id: event.repo_id,
            name: event.repo_name,
            url: event.repo_url
          },
          created_at: event.created_at
        }
      })
      res.json(eventData);
    })
    .catch(err => console.log(err));
});


router.get("/actors/:actorId", (req, res, next) => {

  Event.findAll({
    where: { actor_id: req.params.actorId },
    order: [['id', 'ASC']]
  })
    .then(events => {
      if (events && events.length > 0) {
        const eventData = events.map(event => {
          return {
            id: event.id,
            type: event.type,
            actor: {
              id: event.actor_id,
              login: event.actor_login,
              avatar_url: event.actor_avatar_url
            },
            repo: {
              id: event.repo_id,
              name: event.repo_name,
              url: event.repo_url
            },
            created_at: event.created_at
          }
        })
        res.json(eventData).status(200);
      }
      else res.sendStatus(404)
    })
    .catch(err => console.log(err));
});


router.get("/:id", (req, res, next) => {
  Event.findAll({
    where: { id: req.params.id }
  })
    .then(event => {
      res.json({
        id: event.id,
        type: event.type,
        actor: {
          id: event.actor_id,
          login: event.actor_login,
          avatar_url: event.actor_avatar_url
        },
        repo: {
          id: event.repo_id,
          name: event.repo_name,
          url: event.repo_url
        },
        created_at: event.created_at
      });
    })
    .catch(err => console.log(err));
});


router.post("/", (req, res, next) => {

  Event.findOrCreate({where: {id: req.body.id },
    defaults: { 
      id: req.body.id,
      type: req.body.type,
      created_at: req.body.created_at,
      actor_id: req.body.actor.id,
      actor_login: req.body.actor.login,
      actor_avatar_url: req.body.actor.avatar_url,
      repo_id: req.body.repo.id,
      repo_name: req.body.repo.name,
      repo_url: req.body.repo.url
    }
  })
  .then(([event, created]) => {
    return res.status(201).json({})
  })
  .catch(err => console.log(err));
});


// router.delete("/events/:id", (req, res, next) => {
router.delete("/", (req, res, next) => {
  Event.destroy({ where: {} })
    .then( ()=> {
      res.json();
    })
    .catch(err => console.log(err));
});



module.exports = router;