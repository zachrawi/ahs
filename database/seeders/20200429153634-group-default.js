'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        name: 'Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Akunting',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pengantar barang',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
