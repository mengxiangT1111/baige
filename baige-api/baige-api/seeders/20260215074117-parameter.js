'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Parameters', [
    {
      categoryId: 1,
      userId: 1,
      name: '心率',
      upthreshold: 120,
      downthreshold:50,
      number:70,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      userId: 1,
      name: '血氧',
      upthreshold: 110,
      downthreshold:90,
      number:98,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      userId: 1,
      name: '血糖',
      upthreshold: 9,
      downthreshold:3.9,
      number:98,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      userId: 1,
      name: '体温',
      upthreshold: 110,
      downthreshold:90,
      number:98,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 1,
      userId: 1,
      name: '血压',
      upthreshold: 110,
      downthreshold:90,
      number:98,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 2,
      userId: 1,
      name: '睡眠时长',
      upthreshold: 600,
      downthreshold:0,
      number:500,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 2,
      userId: 1,
      name: '翻滚次数',
      upthreshold: 60,
      downthreshold:0,
      number:5,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryId: 2,
      userId: 1,
      name: '觉醒次数',
      upthreshold: 5,
      downthreshold:0,
      number:0,
      reminder:0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Parameters', null, {});
}

};
