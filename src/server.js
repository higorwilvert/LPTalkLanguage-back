import express from "express";
import cors from "cors";
import contatoRouter from "./routes/contato.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/contatos", contatoRouter);

app.get("/", (req, res) => {
  res.send("API Talk Language Rodando...");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
