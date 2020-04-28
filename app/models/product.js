'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Product.associate = function(models) {
    Product.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'owner',
    });
  };
  return Product;
};