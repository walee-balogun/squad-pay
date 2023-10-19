const _ = require('lodash');

class BankAccountsRepository {

    constructor({ bankAccountModel }) {

        this.bankAccountModel = bankAccountModel;
    }

    async create(data) {

        let bankAccountData = _.pick(data, ['name', 'number', 'code']);

        try {

            const createdBankAccount = await this.bankAccountModel.create(bankAccountData);

            return createdBankAccount;


        } catch (err) {
            console.error(err);

            throw err;
        }

    };

    async findAll(query) {

        try {

            const bankAccounts = await bankAccountModel.findAll({ where: query });

            return bankAccounts;

        } catch (error) {
            console.error(err);

            throw err;
        }
    }

    async findOne(query) {

        try {

            const bankAccount = await bankAccountModel.findOne({
                raw: true,
                where: query
            });

            return bankAccount;

        } catch (error) {

            console.error(err);

            throw err;
        }
    }

}

module.exports = Object.assign({}, { BankAccountsRepository });