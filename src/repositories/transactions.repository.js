class TransactionsRepository {

    constructor({ transactionModel, cardModel, bankAccountModel }) {

        this.transactionModel = transactionModel;
        this.cardModel = cardModel;
        this.bankAccountModel = bankAccountModel;
    }

    async create(data, card, bankAccount) {

        let transactionData;

        if (card && data.paymentMethod == 'card') {
            transactionData = {
                ...data,
                status: 'pending',
                //reference: 'oiervirojvreiov123',
                cardId: card.id
            }
        } else if (bankAccount && data.paymentMethod == 'pwbt') {

            transactionData = {
                ...data,
                status: 'success',
                //reference: 'oiervirojvreiov234r',
                bankAccountId: bankAccount.id
            }
        } else {

            console.error('Invalid transaction data');

            throw new Error('Invalid transaction data');
        }


        try {

            const createdTransaction = await this.transactionModel.create(transactionData);

            return createdTransaction;


        } catch (err) {
            console.error(err);

            throw err;
        }

    };

    async findAll(query) {

        try {

            const transactions = await this.transactionModel.findAll({ where: query, /* include: [{ model: this.cardModel }, { model: this.bankAccountModel }] */ });

            return transactions;

        } catch (err) {
            console.error(err);

            throw err;
        }
    }

    async findOne(query) {

        try {

            const transaction = await this.transactionModel.findOne({
                //raw: true,
                where: query,/* 
                include: [{ model: this.cardModel }, { model: this.bankAccountModel }] */
            });

            return transaction;

        } catch (err) {

            console.error(err);

            throw err;
        }
    }

    async updateOne(query, transactionData) {

        try {

            const updatedTransaction = await this.transactionModel.update(transactionData, { where: query });

            return updatedTransaction;
            
        } catch (err) {
            
            console.error(err);

            throw err;
        }
       

    }

    async update(transaction, transactionData) {

        try {

            const updatedTransaction = await transaction.update(transactionData);


            return updatedTransaction;
            
        } catch (err) {
            
            console.error(err);

            throw err;
        }
       

    }

    async updateStatus(transaction, status) {

        try {

            transaction.status = status;

            const updatedTransaction = await transaction.save();

            return updatedTransaction;
            
        } catch (err) {
            
            console.error(err);

            throw err;
        }
       

    }

    async sumByStatus(merchantId, status) {

        try {
            
            const totalAmount = await this.transactionModel.sum('amount', { where: { merchantId: merchantId, status: status} });

            return totalAmount;

        } catch (err) {
            
            console.error(err);

            throw err;
        }
    }

}

module.exports = Object.assign({}, { TransactionsRepository });