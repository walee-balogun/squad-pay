const { createContainer, asValue, asClass, InjectionMode } = require('awilix');
const { TransactionsController } = require('../controllers/transactions.controller');
const { TransactionsService } = require('../services/transactions.service');
const { TransactionsRepository } = require('../repositories/transactions.repository');
const { CardsRepository } = require('../repositories/cards.repository');

const init = ({dbConn}) => {

    const container = createContainer({ injectionMode: InjectionMode.PROXY });
    
    container.register({
        dbConn: asValue(dbConn),
        //models: asValue(models),
        //cardsModel: asValue(models.card),
        //transactionsModel: asValue(models.transaction),
        //repositories: asValue(repositories),
        //cardsRepo: asClass(CardsRepository),
        //transactionsRepo: asClass(TransactionsRepository), //.inject(() => models),
        //transactionsService: asClass(TransactionsService),
        //transactionsController: asClass(TransactionsController).inject(() => TransactionsService),
        
    });

    return container;

}

module.exports = Object.assign({}, { init });