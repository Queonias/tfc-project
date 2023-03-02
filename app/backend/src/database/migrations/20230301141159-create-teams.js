'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('teams', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
     },
     teamName: {
      type: Sequelize.STRING,
      field: 'team_name'
     }
   });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
