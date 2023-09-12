const service = require("../services/transactionService");
const AppError = require("../utils/AppError");


const create = async (req, res) => {

    const {id} = req.locals;
    const {tipo, descricao, valor, data, categoria_id} = req.body;

    try {
        const response = await service.executeCreate(id, tipo, descricao, valor, data, categoria_id);
        
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Server error'});
    }
};

const getAll = async (req, res) => {
    const {filtro} = req.query;

    const { id: usuario_id } = req.locals;

    try {
        const response = await service.executeGetAll(usuario_id, filtro);
        
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Server error'});
    }
};

const getOne = async (req, res) => {

    const { id: usuario_id } = req.locals;
    const { id } = req.params;

    try {
        const response = await service.executeGetOne(id, usuario_id);
        
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Server error'});
    }
};

const edit = async (req, res) => {
    const {id: usuario_id} = req.locals;
    const {id} = req.params;
    const {descricao, valor, data, categoria_id, tipo} = req.body;

    try {

        await service.executeEdit(usuario_id, id, descricao, valor, data, categoria_id, tipo);
        
        return res.status(204).json();
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Server error'});
    }
};

const remove = async (req, res) => {
    const {id: usuario_id} = req.locals;
    const {id} = req.params;

    try {

        await service.executeRemove(usuario_id, id);
        
        return res.status(204).json();
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Server error'});
    }
};

const getStatement = async (req, res) => {
    const {id: usuario_id} = req.locals;

    try {

        const response = await service.executeGetStatement(usuario_id);
        
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Server error'});
    }
};

module.exports = {create, getAll, getOne, edit, remove, getStatement}