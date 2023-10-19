const { DataTypes, Model } = require('sequelize');
const { Transaction } = require('./transaction');

class Card extends Model {

}

const { DataTypes, Model } = require('sequelize');
const { Transaction } = require('./transaction');

class Card extends Model {

}

const init = (sequelize) => {

    Card.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      last4: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiryDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false
      },

    }, {
      sequelize,
      freezeTableName: false,
        timestamps: true,
        paranoid: true,
    });

    Card.sync({ force: true });

    return Card;
}

module.exports = Object.assign({}, { init, Card })