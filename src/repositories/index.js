const { asClass } = require('awilix');
const { CardsRepository } = require('./cards.repository');
const { TransactionsRepository } = require('./transactions.repository');
const { TransactionsService } = require('../services/transactions.service');
const { TransactionsController } = require('../controllers/transactions.controller');
const { BankAccountsRepository } = require('./bank-accounts.repository');
const { PayoutsRepository } = require('./payouts.repository');
const { PayoutsService } = require('../services/payouts.service');

const repository = (container) => {

    //const dbConn = container.resolve('dbConn');

    container.register({
        bankAccountsRepo: asClass(BankAccountsRepository),
        cardsRepo: asClass(CardsRepository),
        transactionsRepo: asClass(TransactionsRepository),
        payoutsRepo: asClass(PayoutsRepository),
        transactionsService: asClass(TransactionsService),
        transactionsController: asClass(TransactionsController).inject(() => TransactionsService),
        payoutsService: asClass(PayoutsService)
    });


    return Object.create({
        //transactionRepo: transactionRepository.init(dbConn),
        BankAccountsRepository,
        CardsRepository,
        PayoutsRepository,
        TransactionsRepository,
    });
    

}

const init = (container) => {

    //const dbConn = container.resolve('dbConn');

    /* if (!dbConn) {

        throw new Error("DB Connection not supplied!");
    } */

    return repository(container);

}

module.exports = Object.assign({}, { init });