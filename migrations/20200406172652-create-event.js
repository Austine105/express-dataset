'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      actor_id: {
        type: Sequelize.INTEGER
      },
      actor_login: {
        type: Sequelize.STRING
      },
      actor_avatar_url: {
        type: Sequelize.STRING
      },
      repo_id: {
        type: Sequelize.INTEGER
      },
      repo_name: {
        type: Sequelize.STRING
      },
      repo_url: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};