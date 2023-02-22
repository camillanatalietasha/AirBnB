'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spot images are related to one spot - association
      SpotImage.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  SpotImage.init({
    spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'Spots',
            key: 'id'
        }
        },
    imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        },
    isPreview: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};