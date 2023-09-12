const pool = require('../../config/config');
const createUsers = require("./createUsers");
const createCategories = require("./createCategories");
const createTransactions = require("./createTransactions");
const feedCategories = require("./feedCategories");

const migrationsRun = async () => {
    await pool.query(createUsers);
    await pool.query(createCategories);
    await pool.query(createTransactions);

    const {rowCount} = await pool.query("SELECT * FROM categorias");
    if (rowCount === 0) {
        await pool.query(feedCategories);
    }
}

module.exports = migrationsRun;