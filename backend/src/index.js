const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs/promises')

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

// Creating new directory and writing data to the file
const writeFile = async(data) => {
  await fs.mkdir('data', { recursive: true })
  await fs.writeFile('data/todos.json', JSON.stringify(data))
}

// Endpoint for sending todo list 
app.get('/todos', async (req, res) => {
  let content;
  try {
  content = await fs.readFile(`./data/todos.json`, 'utf-8')
  res.json(JSON.parse(content))
  }catch(e){
    //If file is not available then creating new file with default list
    const defaultList = {
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [],
      },
    }
    writeFile(defaultList)
    res.json(defaultList)
  }
})

// Endpoint for saving todo list
app.post('/todos', async (req, res) => {
  writeFile(req.body)
  res.sendStatus(201)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
