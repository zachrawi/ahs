'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    merchant_id: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};