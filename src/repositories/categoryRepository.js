const pool = require("../config/config");

const findAll = async () => {
    return await pool.query(
        `SELECT * FROM categorias;`
    );
}

const findById = async (id) => {
    return await pool.query(
        `SELECT * FROM categorias WHERE id = $1;`,
        [id]
    );
}

module.exports = { findAll, findById};