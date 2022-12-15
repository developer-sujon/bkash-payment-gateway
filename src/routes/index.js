//External import
const routes = require("express").Router();

//Internal Import
const bkashRoutes = require("./bkashRoutes");

//Brand Routes
routes.use("/bkash", bkashRoutes);

module.exports = routes;
