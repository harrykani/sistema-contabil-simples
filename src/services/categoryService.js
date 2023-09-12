const categoryRepo = require("../repositories/categoryRepository");

const execute = async () => {
    const {rows} = await categoryRepo.findAll();
    return rows;
}

module.exports = { execute };