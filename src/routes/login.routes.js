const { Router } = require("express");
const { logInRequirements } = require('../middlewares/account');
const { logIn } = require('../controller/userController');

const routes = Router();

routes.post('/', logInRequirements, logIn);

module.exports = routes;