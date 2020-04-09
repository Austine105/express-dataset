'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: DataTypes.STRING,
    actor_id: DataTypes.INTEGER,
    actor_login: DataTypes.STRING,
    actor_avatar_url: DataTypes.STRING,
    repo_id: DataTypes.INTEGER,
    repo_name: DataTypes.STRING,
    repo_url: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      // uses moment to format the date output
      get: function()  {
        return moment(this.getDataValue('created_at')).format("YYYY-MM-DD HH:mm:ss");
      },
    }
  }, {
    // options
    timestamps: false,
  });
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};