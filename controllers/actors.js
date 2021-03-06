'use strict'
const { QueryTypes } = require('sequelize');
const sequelize = require('../models').sequelize;


// user vars
const Event = require("../models").Event;
const { streakSort } = require('../util/function');

// gets all actors
const getAllActors = ((req, res, next) => {

  (async function () {
    try {
      const actors = await sequelize.query("SELECT actor_id as id, actor_login as login, actor_avatar_url as avatar_url FROM events GROUP BY actor_id ORDER BY COUNT('actor_id') DESC, created_at DESC, actor_login", { type: QueryTypes.SELECT })
      if (actors) res.json(actors)
    }
    catch(err){
      res.status(400).json(err)
    }
  })();

});

// update an actor
const updateActor = ((req, res, next) => {
  let {id, login, avatar_url } = req.body;
  let fieldChanged = false

  Event.findOne({ where: { actor_id: id } })
    .then(event => {

      if(!event) return res.sendStatus(404)
      
      if (login && login !== event.actor_login) fieldChanged = true

      Event.update({ actor_login: login, actor_avatar_url: avatar_url }, { where: { actor_id: id } })
      .then(event => {
        res.sendStatus((fieldChanged) ? 400: 200);
      })
    })
    .catch(err => console.log(err));
});

// get actors by streak
const getStreak = ((req, res, next) => {
	Event.findAll({})
    .then(events => {
      let actors = events.map(event => {
        const actor = { id: event.actor_id, login: event.actor_login, avatar_url: event.actor_avatar_url }
        const obj = {...actor, created_at: event.created_at }
        return obj;
      });
      actors = streakSort(actors);
      res.json(actors)
  })
  .catch(err => console.log(err));
});


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















