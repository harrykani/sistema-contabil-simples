const createTransactions = `
    CREATE TABLE IF NOT EXISTS transacoes (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor INT NOT NULL,
    data TIMESTAMP NOT NULL,
    categoria_id INT REFERENCES categorias(id),
    usuario_id INT REFERENCES usuarios(id),
    tipo VARCHAR(7) NOT NULL
    );
`

module.exports = createTransactions;