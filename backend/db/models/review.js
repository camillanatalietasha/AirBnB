'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Reviews have one user - association
      Review.belongsTo(models.User, { foreignKey: "userId" });
      // Reviews have one spot - association
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Review.init({
    spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        },
    review: { 
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
            len: [10, 1000],
        },
        },
    stars: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
        },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};