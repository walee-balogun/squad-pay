const { DataTypes, Model } = require('sequelize');
const Card = require('./card');

const init = (sequelize) => {

    const Transaction = sequelize.define('transaction', {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      merchantId: {
        type: DataTypes.STRING,
        allowNull: false
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
      chargedAmount: {
        type: DataTypes.DOUBLE,
        default: 0
      },
      amount: {
        type: DataTypes.DECIMAL(10,2),
        default: 0
      },
      feeInPercent: {
        type: DataTypes.DOUBLE,
        default: 0
      },
      feeAmount: {
        type: DataTypes.DOUBLE,
        default: 0
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },

    }, {
      freezeTableName: false,
        timestamps: true,
        paranoid: true,
        /* classMethods: (models) => {
          Transaction.hasMany(models.card);
          Transaction.hasMany(models.bankAccount);
        } */
    });


    //Transaction.belongsTo(Card.init(sequelize));
    //Transaction.sync({ force: true });

    return Transaction;
}

module.exports = Object.assign({}, { init });