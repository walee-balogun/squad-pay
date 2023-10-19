const { Op } = require("sequelize");

class TransactionsService {


    constructor({ transactionsRepo, cardsRepo, bankAccountsRepo, payoutsService }) {
        this.transactionsRepository = transactionsRepo;
        this.cardsRepository = cardsRepo;
        this.bankAccountsRepository = bankAccountsRepo;
        this.payoutsService = payoutsService;
    }

    async process(transactionData) {

        let card;
        let bankAccount;
        let transaction;

        if (transactionData.paymentMethod === 'card') {

            card = await this.cardsRepository.create(transactionData.card);

            transactionData.feeInPercent = 0.03;
            transactionData.feeAmount = transactionData.feeInPercent * transactionData.amount;
            transactionData.chargedAmount = transactionData.amount;
            transactionData.amount = transactionData.chargedAmount - transactionData.feeAmount;

            transaction = await this.transactionsRepository.create(transactionData, card, bankAccount);

        } else if (transactionData.paymentMethod === 'pwbt') {

            bankAccount = await this.bankAccountsRepository.create(transactionData.bankAccount);

            transactionData.feeInPercent = 0.05;
            transactionData.feeAmount = transactionData.feeInPercent * transactionData.amount;

            transactionData.chargedAmount = transactionData.amount;
            transactionData.amount = transactionData.chargedAmount - transactionData.feeAmount;

            transaction = await this.transactionsRepository.create(transactionData, card, bankAccount);

            const payoutData = { merchantId: transaction.merchantId, currency: transaction.currency, amount: transaction.amount };


            await this.payoutsService.create(payoutData);


        } else {

            console.error('Invalid transaction data');

            throw new Error('Invalid transaction data');
        }

        return transaction;
    }

    async settle(transactionData) {

        const transaction = await this.transactionsRepository.findOne({ currency: transactionData.currency, reference: transactionData.reference });

        if (transaction == null) {
            throw new Error('Invalid transaction data');
        }

        await this.transactionsRepository.update(transaction, { status: "success" });
        //await this.transactionsRepository.updateOne({/*  chargedAmount: { [Op.eq]: Number(transactionData.amount) }, */ reference: transactionData.reference, currency: transactionData.currency }, { status: "success" });

        //const transaction = await this.transactionsRepository.findOne({ currency: transactionData.currency, reference: transactionData.reference });

        const payoutData = { merchantId: transaction.merchantId, currency: transaction.currency, amount: transaction.amount };

        await this.payoutsService.create(payoutData);

        return transaction;
    }

    getAll(query) {

        return this.transactionsRepository.findAll(query);
    }

    getOne(query) {

        return this.transactionsRepository.findOne(query);
    }

    async getAvailableBalance(merchantId) {

        return this.transactionsRepository.sumByStatus(merchantId, 'success');

    }

    async getPendingSettlementBalance(merchantId) {

        return this.transactionsRepository.sumByStatus(merchantId, 'pending');
    }

}

module.exports = Object.assign({}, { TransactionsService })