const pool = require('../config/config');

const findByEmail = async (email) => {
    return await pool.query(
        `SELECT * FROM usuarios WHERE email = $1;`,
        [email]
    );
};

const findByEmailAndFilterId = async (email, id) => {
    return await pool.query(
        'SELECT * FROM usuarios WHERE email = $1 AND id != $2;',
        [email, id]
    );
};

const insertUser = async (nome, email, senha) => {
    return await pool.query(
        `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email;`,
        [nome, email, senha]
    );
};

const updateUser = async (nome, email, senha, id) => {
    return await pool.query(
        `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4;`,
        [nome, email, senha, id]
    );
};

const findByID = async (id) => {
    return await pool.query(
        `SELECT * FROM usuarios WHERE id = $1;`,
        [id]
    );
};

module.exports = { findByEmail, insertUser, findByID, findByEmailAndFilterId, updateUser};