const Sequelize = require("sequelize");

const connect = async (options) => {

    sequelize = new Sequelize(options.db, options.username, options.password, {
        host: options.hostname,
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
            acquire: 1000000,
        },
        logging: false
    })

    try {

        await sequelize.authenticate();

        console.log('Connection has been established successfully.');

        return sequelize;

    } catch (err) {

        console.error('Unable to connect to the database:', error);

        throw err;
    }

}

const cleanup = async () => {

    try {

        await sequelize.close();

        //mediator.emit('db.close');

    } catch (err) {

        console.error(err);

    }
}

module.exports = Object.assign({}, { connect, cleanup })