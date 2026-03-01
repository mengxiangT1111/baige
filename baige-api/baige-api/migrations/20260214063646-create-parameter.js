'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      reminder: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.TINYINT.UNSIGNED
      },
      upthreshold: {
        allowNull: false,
        defaultValue: 120,
        type: Sequelize.FLOAT
      },
      downthreshold: {
        allowNull: false,
        defaultValue: 60,
        type: Sequelize.FLOAT
      },
      number: {
        allowNull: false,
        defaultValue: 80,
        type: Sequelize.FLOAT
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
    'Parameters', {
      fields: ['categoryId']
    });
  await queryInterface.addIndex(
    'Parameters', {
      fields: ['userId']
    });
},
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Parameters');
  }
};