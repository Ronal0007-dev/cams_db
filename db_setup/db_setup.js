const dbConfig = require("dotenv").config().parsed;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASS, {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = { db, sequelize };