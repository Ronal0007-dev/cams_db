'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ClassName: {
        type: Sequelize.ENUM('EYC', 'Stage One', 'Stage Two', 'Stage Three', 'Stage Four', 'Stage Five', 'Stage Six', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'),
        allowNull: false,
        defaultValue: 'EYC',
      },
      Stream: {
        type: Sequelize.ENUM('H', 'T'),
        allowNull: false,
        defaultValue: 'H',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};