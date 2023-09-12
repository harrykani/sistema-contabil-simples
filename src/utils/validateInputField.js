const AppError = require("./AppError");

const validateInputFields = (fields) => {
    const emptyField = fields.some(field => field === undefined);
    if (emptyField) {
        throw new AppError('All fields are mandatory', 400)
    }
}

module.exports = validateInputFields;