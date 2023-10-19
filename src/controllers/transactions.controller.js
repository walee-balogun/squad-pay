class TransactionsController {

    constructor({transactionsService}) {
       
        this.transactionsService = transactionsService;

    }

    async process(req, res) {

        try {
            
            const transaction = await req.container.resolve('transactionsService').process(req.body);

            return res.json({
                code: '00',
                status: 'success',
                success: true,
                message: 'Transaction was processed successfully',
                data: {
                    transaction: transaction
                }
            });

        } catch (err) {
            
            console.error(err);
            return res.status(404).json({
                code: '99',
                status: 'error',
                success: false,
                message: 'Unable to process transaction',
                error: {
                    name: err.name,
                    message: err.message
                }
            });

        }

    }

    async settle(req, res) {

        try {
            
            //this.transactionsService = req.container.resolve('transactionsService')
            //console.log('---- this.transactionsService ----');
            //console.log(this.transactionsService);

            const transaction = await req.container.resolve('transactionsService').settle(req.body);

            return res.json({
                code: '00',
                status: 'success',
                success: true,
                message: 'Transaction was settled successfully',
                data: {
                    transaction: transaction
                }
            });

        } catch (err) {
            
            console.error(err);
            return res.status(404).json({
                code: '99',
                status: 'error',
                success: false,
                message: 'Unable to settle transaction',
                error: {
                    name: err.name,
                    message: err.message
                }
            });

        }

    }

    async getAll(req, res) {

        try {
            
            const transactions = await req.container.resolve('transactionsService').getAll(req.query);

            return res.json({
                code: '00',
                status: 'success',
                success: true,
                message: 'Transaction(s) were retrieved successfully',
                data: {
                    transactions: transactions
                }
            });

        } catch (err) {
            
            console.error(err);

            return res.status(404).json({
                code: '99',
                status: 'error',
                success: false,
                message: 'Unable to retrieve transaction(s)',
                error: {
                    name: err.name,
                    message: err.message
                }
            });

        }

    }

    async getBalances(req, res) {

        try {
            
            const availableBalance = await req.container.resolve('transactionsService').getAvailableBalance(req.params.id);

            const pendingSettlementBalance = await req.container.resolve('transactionsService').getPendingSettlementBalance(req.params.id);

            return res.json({
                code: '00',
                status: 'success',
                success: true,
                message: 'Balance(s) were retrieved successfully',
                data: {
                    balance: {
                        available: availableBalance,
                        pendingSettlement: pendingSettlementBalance
                    }
                }
            });

        } catch (err) {
            
            console.error(err);

            return res.status(404).json({
                code: '99',
                status: 'error',
                success: false,
                message: 'Unable to retrieve balance(s)',
                error: {
                    name: err.name,
                    message: err.message
                }
            });

        }

    }

}

module.exports = Object.assign({}, { TransactionsController })