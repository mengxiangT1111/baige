'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Categories', [
    { name: '手环数据', rank: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: '睡眠数据', rank: 2, createdAt: new Date(), updatedAt: new Date() },
    { name: '其他数据', rank: 3, createdAt: new Date(), updatedAt: new Date() },
    { name: '家人关心', rank: 4, createdAt: new Date(), updatedAt: new Date() },
    { name: '医生提醒', rank: 5, createdAt: new Date(), updatedAt: new Date() },
  ], {});
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Categories', null, {});
}
};
