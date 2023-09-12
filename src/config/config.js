const {Pool} = require('pg');
const dotenv = require("dotenv");

dotenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const pool = new Pool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
});

module.exports = pool;
