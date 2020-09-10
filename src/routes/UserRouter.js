const express = require("express");
const UserRouter = express.Router();

const UserController = require("../controllers/UserController");

UserRouter.get("/login", UserController.signin);

UserRouter.post("/signup", UserController.register);

// UserRouter.post("/user/new", UserController.create);

// UserRouter.put("/user/:id", UserController.updated);

// UserRouter.delete("/user/:id", UserController.delete);


module.exports = UserRouter;
