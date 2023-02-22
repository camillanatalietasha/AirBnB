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
      Spot.belongsTo(models.User, { foreignKey: "hostId" });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  
  Spot.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    hostId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2,50]
        }
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2,30]
        }
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2,30]
        }
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2,30]
        }
    },
    lat: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
            isDecimal: true,
        },
    },
    lng: {
        allowNull: false,
        type: DataTypes.DECIMAL,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            len: [2,50]
        }
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
            len: [2,5000]
        }
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
        },
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};