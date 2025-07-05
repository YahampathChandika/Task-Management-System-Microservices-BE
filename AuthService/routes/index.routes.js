const express = require("express");

// const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");


function routes() {

    const router = express.Router();
    
    router.use("/", authRoutes); 

    return router;
}

module.exports = routes();