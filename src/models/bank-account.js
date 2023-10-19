const { DataTypes } = require('sequelize');

const init = (sequelize) => {

    const BankAccount = sequelize.define('bankAccount', {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },

    }, {
        tableName: 'bank-accounts',
        timestamps: true,
        paranoid: true,
        /* classMethods: (models) => {
          BankAccount.belongsTo(models.transaction);
        } */

    });

    //BankAccount.sync({ force: true });

    return BankAccount;
}

module.exports = Object.assign({}, { init })