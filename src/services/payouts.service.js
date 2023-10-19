const _ = require('lodash');

class PayoutsService {

    
    constructor({ transactionsRepo, payoutsRepo }) {
        this.transactionsRepository = transactionsRepo;
        this.payoutsRepository = payoutsRepo;
    }

    async create(data) {

        const payoutData = _.pick(data, ['merchantId', 'currency', 'amount']);
    
        return this.payoutsRepository.create(payoutData);
    }

    getAll(query) {

        return this.payoutsRepository.findAll(query);
    }

    getOne(query) {

        return this.payoutsRepository.findOne(query);
    }

}

module.exports = Object.assign({}, { PayoutsService })