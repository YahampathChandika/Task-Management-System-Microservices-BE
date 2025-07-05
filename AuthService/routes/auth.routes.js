const express = require("express");
const authController = require("../controller/auth.controller.js");


function getAuthRoutes(){
    const router = express.Router();
    router.use(express.json());

    router.post("/login", authController.login);

    return router;
}

module.exports = getAuthRoutes();