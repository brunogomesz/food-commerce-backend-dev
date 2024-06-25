import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"

dotenv.config() // vai ler todas as configurações do .env

const app: Express = express() // inicializa a constante aap como Express = express ()
const port = process.env.PORT || 5000 // process.env lê variáveis que estão dentro do dotenv, e se a porta vier como nulo, ele seta para 5000
const prisma = new PrismaClient() // faz cpnexão com o banco de dados

// Express é um mini servidor web
// o node.js não tem a capacidade nativa de trazer essd parte de conexão web, conexão API
app.use(express.json()) // usando o express no modo JSON

// rota
// o get é o verbo do html
// temos o get, post, put, delete, patch
// get - index, show
// post - store
// put - update
// delete - destroy
app.get("/", (req: Request, res: Response) => {
  const { message } = req.body // pegando o json do Insomnia

  if (!message) return res.status(400).send({ error: "Message is required"})

  res.send({ message })
})

app.get("/snacks", async (req: Request, res: Response) => {
  const { snack } = req.query

  if (!snack) return res.status(400).send({ error: "Snack is required" })

  // SELECT * FROM Snack WHERE snack = 'drink'
  const snacks = await prisma.snack.findMany({
    where: {
      snack: {
        equals: snack as string,
      },
    },
  })

  // retorna os valores
  res.send(snacks)
})

// fala para o express escutar uma porta
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
