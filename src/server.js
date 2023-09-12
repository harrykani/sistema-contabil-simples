const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const migrationsRun = require("./database/migrations");

dotenv.config();
migrationsRun();

const app = express();

app.use(express.json());

app.use(routes);

module.exports = app;