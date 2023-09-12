const pool = require('../config/config');

const insertTransaction = async (usuario_id, tipo, descricao, valor, data, categoria_id) => {
    return await pool.query(
        `INSERT INTO transacoes 
            (usuario_id, tipo, descricao, valor, data, categoria_id)
         VALUES
            ($1, $2, $3, $4, $5, $6) RETURNING *,
        (SELECT descricao AS categoria_nome FROM categorias WHERE categorias.id = transacoes.categoria_id);`,
        [usuario_id, tipo, descricao, valor, data, categoria_id]
    );
}

const findAll = async (usuario_id) => {
    return await pool.query(
        `SELECT t.*, c.descricao AS categoria_nome FROM transacoes
         t JOIN categorias c ON t.categoria_id = c.id WHERE usuario_id = $1 ORDER BY t.id ASC;`,
        [usuario_id]
    );
}

const findAllByCategory = async (usuario_id, categoria_nome) => {
    return await pool.query(
        `SELECT t.*, c.descricao AS categoria_nome FROM transacoes
         t JOIN categorias c ON t.categoria_id = c.id 
         WHERE usuario_id = $1 AND c.descricao ILIKE $2;`,
        [usuario_id, categoria_nome]
    );
}

const findById = async (id, usuario_id) => {
    return await pool.query(
        `SELECT t.*, c.descricao AS categoria_nome FROM transacoes 
         t JOIN categorias c ON t.categoria_id = c.id 
         WHERE usuario_id = $1 AND t.id = $2;`,
        [usuario_id, id]
    );
}

const updateTransaction = async (id, descricao, valor, data, categoria_id, tipo) => {
    return await pool.query(
        `UPDATE transacoes SET descricao = $1, valor = $2, tipo = $3, data = $4, categoria_id = $5 WHERE id = $6`,
         [descricao, valor, tipo, data, categoria_id, id]
    );
};

const deleteTransaction = async (id) => {
    return await pool.query(
        `DELETE FROM transacoes WHERE id = $1`,
         [id]
    );
};

const getStatement = async (usuario_id) => {
    return await pool.query(`
    SELECT 
        COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END), 0)::INT AS entrada,
        COALESCE(SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END), 0)::INT AS saida
    FROM transacoes
    WHERE usuario_id = $1;
    `, [usuario_id]);

};

module.exports = { insertTransaction, findAll, findById, updateTransaction, deleteTransaction, getStatement, findAllByCategory };