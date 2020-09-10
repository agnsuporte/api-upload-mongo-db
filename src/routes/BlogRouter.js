const express = require("express");
const blogRouter = express.Router();

const blogController = require("../controllers/BlogController");

blogRouter.get("/blog", blogController.index);

blogRouter.post("/blog/new", blogController.create);

module.exports = blogRouter;
