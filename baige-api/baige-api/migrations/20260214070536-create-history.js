'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      parameterId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      day: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER.UNSIGNED
      },
      data: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER.UNSIGNED
      },
      rank: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER.UNSIGNED
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
    await queryInterface.addIndex(
        'Histories', {
          fields: ['parameterId']
        });
    },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};