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
        hooks: true,
      });
    }
  }
  
  Spot.init({
    hostId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [3,30],
        },
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [3,30],
        },
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [3,30],
        },
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [3,30],
        },
    },
    lat: {
        allowNull: false,
        type: DataTypes.DECIMAL(2,5),
    },
    lng: {
        allowNull: false,
        type: DataTypes.DECIMAL(2,5),
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [3,30],
        },
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
            len: [3,3000]
        }
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