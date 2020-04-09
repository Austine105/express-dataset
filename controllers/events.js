'use strict'
const Event = require("../models").Event;


// gets all events
const getAllEvents = ((req, res, next) => {
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

// add a new event
const addEvent = ((req, res, next) => {

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

// get events by actor id
const getByActor = ((req, res, next) => {

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

// delete all events
const eraseEvents = ((req, res, next) => {
  Event.destroy({ where: {} })
    .then( ()=> {
      res.json();
    })
    .catch(err => console.log(err));
});


module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















