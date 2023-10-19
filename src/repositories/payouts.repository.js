const _ = require('lodash');

class PayoutsRepository {

    constructor({ transactionModel, payoutModel }) {

        this.transactionModel = transactionModel;
        this.payoutModel = payoutModel;
    }

    async create(data) {

        let payoutData = _.pick(data, ['merchantId', 'amount', 'currency']);
        
        try {

            const createdPayout = await this.payoutModel.create(payoutData);

            return createdPayout;


        } catch (err) {
            console.error(err);

            throw err;
        }

    };

    async findAll(query) {

        try {

            const payouts = await this.payoutModel.findAll({ where: query });

            return payouts;

        } catch (err) {
            console.error(err);

            throw err;
        }
    }

    async findOne(query) {

        try {

            const transaction = await this.payoutModel.findOne({
                where: query
            });

            return transaction;

        } catch (err) {

            console.error(err);

            throw err;
        }
    }

}

module.exports = Object.assign({}, { PayoutsRepository });