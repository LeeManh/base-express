import express from 'express'
import { config } from 'dotenv'
import databaseService from './services/database.service'
import authRouter from './routes/auth.routes'
import usersRouter from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/errors/defaultErrorHandler'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/files'
import { UPLOAD_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'

config()
initFolder()

const app = express()
const port = process.env.PORT

// Connect to the database
databaseService.connect()

// Middlewares
app.use(express.json())

// Routes
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)

// Error handler
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
