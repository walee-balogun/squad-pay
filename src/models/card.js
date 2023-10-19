const { DataTypes, Model } = require('sequelize');
const Transaction = require('./transaction');

class Card extends Model {

}

const init = (sequelize) => {

    const Card = sequelize.define('card', {
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
      freezeTableName: false,
        timestamps: true,
        paranoid: true,
        /* classMethods: (models) => {
            Card.belongsTo(sequelize.transaction);
        } */

    });

    //Card.belongsTo(Transaction.init(sequelize));
    //Card.hasMany(Transaction);
    
    //Card.sync({ force: true });

    return Card;
}

module.exports = Object.assign({}, { init })