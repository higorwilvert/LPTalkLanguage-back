import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const contatos = await prisma.contato.findMany({
    orderBy: { criadoEm: "desc" },
  });
  res.json(contatos);
});

router.post("/", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;
  try {
    const contato = await prisma.contato.create({
      data: { nome, email, telefone, mensagem },
    });
    res.status(201).json(contato);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar contato" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contato.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Contato deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar contato" });
  }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, mensagem } = req.body;
  
    try {
      const contatoAtualizado = await prisma.contato.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          telefone,
          mensagem,
        },
      });
  
      res.json({
        message: "Contato atualizado com sucesso",
        data: contatoAtualizado,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Erro ao atualizar contato" });
    }
  });

export default router;
