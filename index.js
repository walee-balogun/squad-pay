const app = require('./src/app');
require('dotenv').config();
const sequelize = require('./src/sequelize');

let server;

(async () => {
    const dbConn = sequelize.connect({ hostname: 'localhost', username: 'postgres', password: 'P@33w0rd.123$', db: 'postgres' });

    const port = process.env.port || 3000;
    server = app.listen(port, () => {
        console.info(`Listening to port ${port}`);
    });


})();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
