const supertest = require('supertest');
const httpStatus = require('http-status');
const sequelize = require('./../src/sequelize');
const di = require('./../src/di/di');

//const app = require('../src/app');
let app;
//const request = supertest(app);
let request;


let dbConn
beforeAll(async () => {
  dbConn = await sequelize.connect({ hostname: 'localhost', username: 'postgres', password: 'P@33w0rd.123$', db: 'postgres' });

  const container = di.init({ dbConn });


  const models = require('./../src/models/index').init(container);
  const repositories = require('./../src/repositories').init(container);

  await dbConn.sync({ force: true });

  app = require('./../src/app').init(container);
  request = supertest(app);

});




describe('Basic', () => {
  test('Mic check', async () => {
    const response = await request.get('/v1/').send();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('It Works');
  });

});

describe('Process transaction', () => {
  test('Process card transaction', async () => {

    const payload = {
      merchantId: "123",
      amount: 200,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "card",
      card: {
        number: "5555555555554444",
        name: "Victor Anuebunwa",
        expiryDate: "06/23",
        cvv: "373"
      }
    };

    const response = await request.post('/v1/transactions/process').send(payload);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Transaction was processed successfully');
  });

  test('Process PWBT transaction', async () => {

    const payload = {
      merchantId: "123",
      amount: 250,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "pwbt",
      bankAccount: {
        name: "John Babawale",
        number: "5555555555",
        code: "058"
      }
    }

    const response = await request.post('/v1/transactions/process').send(payload);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Transaction was processed successfully');
  });

  test('Maintain a unique transaction reference', async () => {

    const payload1 = {
      merchantId: "123",
      amount: 250,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "pwbt",
      bankAccount: {
        name: "John Babawale",
        number: "5555555555",
        code: "058"
      }
    }

    const response1 = await request.post('/v1/transactions/process').send(payload1);

    const payload2 = {
      merchantId: "123",
      amount: 250,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "pwbt",
      bankAccount: {
        name: "John Babawale",
        number: "5555555555",
        code: "058"
      }
    }

    const response2 = await request.post('/v1/transactions/process').send(payload2);

    expect(response1.body.data.transaction.reference).not.toBe(response2.body.data.transaction.reference);

  });

  test('Create card transaction with a pending status and fee to be 3%', async () => {

    const payload = {
      merchantId: "123",
      amount: 200,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "card",
      card: {
        number: "5555555555554444",
        name: "Victor Anuebunwa",
        expiryDate: "06/23",
        cvv: "373"
      }
    };

    const response = await request.post('/v1/transactions/process').send(payload);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.data.transaction.status).toBe('pending');
    expect(response.body.data.transaction.feeInPercent).toBe(3 / 100);
  });

  test('Create PWBT transaction with a success status and to be 5%', async () => {

    const payload = {
      merchantId: "123",
      amount: 250,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "pwbt",
      bankAccount: {
        name: "John Babawale",
        number: "5555555555",
        code: "058"
      }
    }

    const response = await request.post('/v1/transactions/process').send(payload);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.data.transaction.status).toBe('success');
    expect(response.body.data.transaction.feeInPercent).toBe(5 / 100);
  });

});

describe('Process settlement requests from card processors', () => {
  test('Update the status of transaction to success ', async () => {

    const payload1 = {
      merchantId: "123",
      amount: 200,
      currency: "NGN",
      description: "Airtime purchase",
      paymentMethod: "card",
      card: {
        number: "5555555555554444",
        name: "Victor Anuebunwa",
        expiryDate: "06/23",
        cvv: "373"
      }
    };

    const response1 = await request.post('/v1/transactions/process').send(payload1);


    const payload2 = {
      amount: 200,
      currency: "NGN",
      reference: response1.body.data.transaction.reference,
      cardNumber: "5555555555554444"
    }

    const response2 = await request.post('/v1/transactions/settle').send(payload2);

    expect(response2.status).toBe(httpStatus.OK);
    expect(response2.body.data.transaction.status).toBe('success');
  });

});

describe('Fetch a list of transactions already created', () => {

  test('fetch a list of transactions', async () => {
    const response = await request.get('/v1/transactions/').send();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Transaction(s) were retrieved successfully');
  });

});

describe('View Merchant\'s Balances', () => {

  test('view merchant\'s available and pending settlement balances', async () => {
    const response = await request.get('/v1/balance/merchant/123').send();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Balance(s) were retrieved successfully');
    expect(response.body.data.balance).toHaveProperty('available');
    expect(response.body.data.balance).toHaveProperty('pendingSettlement');
  });

});


afterAll(() => {

  sequelize.cleanup();

})