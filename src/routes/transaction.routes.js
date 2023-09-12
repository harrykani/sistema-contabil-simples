const { Router } = require("express");

const {validateUserToken} = require('../middlewares/account');
const inputRequirements = require('../middlewares/transaction');
const { create, getAll, getOne, edit, remove, getStatement } = require('../controller/transactionController');

const routes = Router();
routes.use(validateUserToken);

routes.get('/extrato', getStatement);
routes.post('/', inputRequirements, create);
routes.get('/', getAll);
routes.get('/:id', getOne);
routes.put('/:id', inputRequirements, edit);
routes.delete('/:id', remove);


module.exports = routes;