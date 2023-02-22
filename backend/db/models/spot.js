'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spots have one host/user - association
      Spot.belongsTo(models.User, { foreignKey: "hostId" });
      // Spots can have many bookings - association 
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      // Spots can have many reviews - association 
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
      // Spots can have many spot images - association 
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }
  
  Spot.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    hostId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lat: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lng: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    nightlyRate: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    cleaningFee: {
    type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};