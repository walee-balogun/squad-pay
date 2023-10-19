const { DataTypes, Model } = require('sequelize');

const init = (sequelize) => {

    const Payout = sequelize.define('payout', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        merchantId: {
            type: DataTypes.STRING,
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
    }, {
        freezeTableName: false,
        timestamps: true,
        paranoid: true,
    });


    return Payout;
}

module.exports = Object.assign({}, { init });