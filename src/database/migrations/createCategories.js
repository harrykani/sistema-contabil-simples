const createCategories = `
    CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
    );
`

module.exports = createCategories;