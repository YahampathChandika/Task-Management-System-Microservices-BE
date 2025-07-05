const express = require("express");

const taskRoutes = require("./task.routes");


function routes() {

    const router = express.Router();
    
    router.use("/", taskRoutes); 

    return router;
}

module.exports = routes();