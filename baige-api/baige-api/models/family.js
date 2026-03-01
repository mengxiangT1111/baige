'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Family extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Family.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    relation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Family',
  });
  return Family;
};