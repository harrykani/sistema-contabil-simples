const { Router } = require("express");

const categoryRoutes = require("./category.routes");
const userRoutes = require("./user.routes");
const loginRoutes = require("./login.routes");
const transactionRoutes = require("./transaction.routes");

const routes = Router();

routes.use("/usuario", userRoutes);
routes.use("/categoria", categoryRoutes);
routes.use("/login", loginRoutes);
routes.use("/transacao", transactionRoutes);

module.exports = routes;