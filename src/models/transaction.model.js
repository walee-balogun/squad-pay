const { DataTypes, Model } = require('sequelize');
const Card = require('./card');

class Transaction extends Model {

}


const init = (sequelize) => {
    
    Transaction.init({
      id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     paymentMethod: {
       type: DataTypes.STRING,
       enum: ['card', 'pwbt'],
       //defaultValue: 'card',
       allowNull: false
     },
     status: {
       type: DataTypes.STRING,
       enum: ['success', 'pending'],
       defaultValue: 'pending',
       allowNull: false
     },
     reference: {
       type: DataTypes.STRING,
       defaultValue: DataTypes.UUIDV4,
       unique: true,
       allowNull: false
     },
     currency: {
       type: DataTypes.STRING,
       allowNull: false
     },
     amount: {
       type: DataTypes.DOUBLE,
       default: 0
     },
     description: {
       type: DataTypes.STRING,
       allowNull: false
     },

   }, {
      sequelize,
     freezeTableName: false,
       timestamps: true,
       paranoid: true,
       
   });

    //Transaction.belongsTo(Card.Card);
    Transaction.sync({ force: true });

    return Transaction;
}

module.exports = Object.assign({}, { init, Transaction });