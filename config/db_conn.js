/**
 * @type {import('sequelize').Sequelize}
 */

const { Sequelize } = require('sequelize');

// const connectionString = process.env.MYSQL_URL || "";
// console.log('Connecting to MYSQL', connectionString);
const database = process.env.MYSQL_DATABASE || 'Ledger';
const username = process.env.MYSQL_USERNAME || 'root';
const password = process.env.MYSQL_PASSWORD || 'password';
const host = process.env.MYSQL_URL || 'localhost';

console.log('Connecting to MYSQL', host);
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully to MYSQL');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = sequelize;
