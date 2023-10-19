const express = require('express');
const router = express.Router();

const init = (container) => {

    router.route('/').get((req, res, next) => {

        return res.status(200).send({
            success: true,
            message: "It Works",
            data: {},
        });
    });

    router.post('/transactions/process', container.resolve('transactionsController').process);

    router.get('/transactions', container.resolve('transactionsController').getAll);

    router.post('/transactions/settle', container.resolve('transactionsController').settle);

    router.get('/balance/merchant/:id', container.resolve('transactionsController').getBalances);

    return router;
}

module.exports = Object.assign({}, { init });