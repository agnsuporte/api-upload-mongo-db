const dotenv= require('dotenv');
const express = require("express");
const path = require("path");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const config = require("./config/config");
const cors = require("cors");

const cred = require("./routes/CredRouter");
const user = require("./routes/UserRouter");

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(cors());

/**
 * Necessário para trabalhar com
 * requisições json
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Upload - acesso pela rota /files/NomeDoArquivo.Ext
 * Local onde será armazenado as imagens.
 */
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

/**
 * ROTAS
 * app.use(userRoutes);
 */

app.get("/", (req, res) => {
  res.send("Você está perdido!!");
});

app.use(user);
app.use(cred);

app.use(errors());

const port = config.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta:", port);
});
