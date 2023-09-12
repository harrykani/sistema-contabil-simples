const transactionRepo = require("../repositories/transactionRepository");
const categoryRepo = require("../repositories/categoryRepository");
const AppError = require("../utils/AppError");

const executeCreate = async (usuario_id, tipo, descricao, valor, data, categoria_id) => {
    const { rowCount } = await categoryRepo.findById(categoria_id);
    if (rowCount < 1) {
        throw new AppError("Category not found", 404);
    }
    
    const { rows } = await transactionRepo.insertTransaction(usuario_id, tipo, descricao, valor, data, categoria_id);

    return rows[0];
}

const executeGetAll = async (usuario_id, filtro) => {
    
    if (filtro) {
        const list = [];

        for (const categoria of filtro) {
            const {rows} = await transactionRepo.findAllByCategory(usuario_id, categoria);
        
            list.push(...rows);
        }

        return list.sort((a, b) => a.id - b.id);
    }

    const { rows } = await transactionRepo.findAll(usuario_id);

    return rows;
}

const executeGetOne = async (id, usuario_id) => {

    const {rowCount, rows} = await transactionRepo.findById(id, usuario_id);

    if (rowCount < 1) {
        throw new AppError("Transaction not found", 404);
    }
    
    return rows[0];
}

const executeEdit = async (usuario_id, id, descricao, valor, data, categoria_id, tipo) => {
    const { rowCount: categoryCount } = await categoryRepo.findById(categoria_id);
    
    if (categoryCount < 1) {
        throw new AppError("Category not found", 404);
    }

    const {rowCount} = await transactionRepo.findById(id, usuario_id);

    if (rowCount < 1) {
        throw new AppError("Transaction not found for the requested user", 404);
    }

    await transactionRepo.updateTransaction(id, descricao, valor, data, categoria_id, tipo);
}

const executeRemove = async (usuario_id, id) => {
    const {rowCount} = await transactionRepo.findById(id, usuario_id);

    if (rowCount < 1) {
        throw new AppError("Transaction not found for the requested user", 404);
    }

    await transactionRepo.deleteTransaction(id);

};

const executeGetStatement = async (usuario_id) => {
    const {rows} = await transactionRepo.getStatement(usuario_id);

    return rows[0];
};

module.exports = {executeCreate, executeGetAll, executeGetOne, executeEdit, executeRemove, executeGetStatement}