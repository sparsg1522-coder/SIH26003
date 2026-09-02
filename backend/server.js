const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'MindCare backend is running! 🧠'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'MindCare API is healthy'
  })
})

app.listen(PORT, () => {
  console.log(`MindCare backend running on http://localhost:${PORT}`)
})