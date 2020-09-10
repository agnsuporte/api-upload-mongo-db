const express = require("express");
const CredRouter = express.Router();

const multer = require("multer");

const multerConfig = require("../config/multer");

const CredController = require("../controllers/CredController");

CredRouter.get("/cred", CredController.index);

CredRouter.get("/cred/:id", CredController.index);

CredRouter.post(
  "/cred/new",

  multer(multerConfig).fields([{
    name: 'imagePassportOrRg', maxCount: 1
  }, {
    name: 'imageSelfieWithPassport', maxCount: 1
  }]),

  CredController.create
);

// CredRouter.put(
//   "/cred/:id",

//   multer(multerConfig).fields([{
//     name: 'imagePassportOrRg', maxCount: 1
//   }, {
//     name: 'imageSelfieWithPassport', maxCount: 1
//   }]),

//   CredController.updated
// );

CredRouter.delete("/cred/:id", CredController.delete);

module.exports = CredRouter;
