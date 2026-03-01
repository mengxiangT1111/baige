'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Settings', [{
    name: '白鸽',
    icp: 'XXXXXXXXXXXXX',
    copyright: '暂无',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
},

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Settings', null, {});
}

};
