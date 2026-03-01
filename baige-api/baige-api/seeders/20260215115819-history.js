'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Histories', [
    {
      parameterId: 1,
      title: '心率',
      content: '反映心脏的工作状态。监测身体是否疲劳、紧张或生病。帮助判断运动强度是否合适。是评估身体健康的重要依据。',
      day:1,
      data:80,
      rank: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      parameterId: 1,
      title: '心率',
      content: '反映心脏的工作状态。监测身体是否疲劳、紧张或生病。帮助判断运动强度是否合适。是评估身体健康的重要依据。',
      day:2,
      data:78,
      rank: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      parameterId: 2,
      title: '高压',
      content: '身体的的高压',
      day:1,
      data:160,
      rank: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      parameterId: 2,
      title: '高压',
      content: '身体的的高压',
      day:2,
      data:145,
      rank: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Histories', null, {});
}

};
