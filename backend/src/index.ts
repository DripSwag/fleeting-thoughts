import express from 'express'
import loginRouter from './routes/login'
import cors from 'cors'
import thoughtRouter from './routes/thought'
import tagRouter from './routes/tag'

const app = express()
const port = 8001

app.use(cors(), express.json())

app.get('/', (req, res) => {
  console.log('test')
  res.send('test')
})

app.use('/login', loginRouter)
app.use('/thought', thoughtRouter)
app.use('/tag', tagRouter)

app.listen(port, () => {
  console.log('running')
})
