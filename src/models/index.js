const { asValue } = require('awilix');
const BankAccount = require('./bank-account');
const Card = require('./card');
const Transaction = require('./transaction');
const Payout = require('./payout');
const TransactionPayout = require('./transaction-payout');

const init = (container) => {
   
    const dbConn = container.resolve('dbConn');

    const bankAccount = BankAccount.init(dbConn);

    const card = Card.init(dbConn);

    const transaction = Transaction.init(dbConn);

    const payout = Payout.init(dbConn);

    const transactionPayout = TransactionPayout.init(dbConn, transaction, payout);

    //card.belongsTo(transaction);
    //bankAccount.belongsTo(transaction);
    card.hasMany(transaction);
    bankAccount.hasMany(transaction);
    payout.belongsToMany(transaction, {through: transactionPayout});

    bankAccount.sync({ force: true });
    card.sync({ force: true });
    transaction.sync({ force: true });
    payout.sync({ force: true });


    container.register({
        bankAccountModel: asValue(bankAccount),
        cardModel: asValue(card),
        transactionModel: asValue(transaction),
        payoutModel: asValue(payout),
        transactionPayoutModel: asValue(transactionPayout)
    });

    return Object.create({ bankAccount, card, payout, transaction });
}

module.exports = Object.assign({}, { init });