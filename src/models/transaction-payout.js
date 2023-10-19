const { DataTypes, Model } = require('sequelize');
const transaction = require('./transaction');

const init = (sequelize, transaction, payout) => {

    const TransactionPayout = sequelize.define('transactionPayout', {
        transactionId: {
            type: DataTypes.INTEGER,
            references: {
                model: transaction,
                key: 'id'
            }
        },
        payoutId: {
            type: DataTypes.INTEGER,
            references: {
                model: payout, 
                key: 'id'
            }
        },
    }, {
        freezeTableName: false,
        timestamps: true,
        paranoid: true,
    });


    return TransactionPayout;
}

module.exports = Object.assign({}, { init });