const AppError = require('../utils/AppError');
const validateInputFields = require('../utils/validateInputField');

const inputRequirements = async (req, res, next) => {
    const {tipo, descricao, valor, data, categoria_id} = req.body;
    
    try {
        validateInputFields([tipo, descricao, valor, data, categoria_id]);
        if (typeof valor !== "number" || valor < 1) {
            throw new AppError("Value must be a number above 0", 400)
        }
        if (!(tipo === 'entrada' || tipo === 'saida')) {
            throw new AppError("Type must be 'entrada' or 'saida'", 400)
        }
        next();
    } catch (error) {
        return res.status(error.statusCode).json({message: error.message});
    }
};

module.exports = inputRequirements;