const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs/promises')

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/todos', async (req, res) => {
  let content;
  try {
  content = await fs.readFile(`./data/todos.json`, 'utf-8')
  res.json(JSON.parse(content))
  }catch(e){
    console.log('unable to read', e)
  }
})

app.post('/todos', async (req, res) => {
  await fs.mkdir('data', { recursive: true })
  await fs.writeFile('data/todos.json', JSON.stringify(req.body))
  res.sendStatus(201)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
