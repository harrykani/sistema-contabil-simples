const { Router } = require("express");

const {validateUserToken} = require('../middlewares/account');
const getCategories = require('../controller/categoryController');

const routes = Router();

routes.get('/', validateUserToken, getCategories);

module.exports = routes;