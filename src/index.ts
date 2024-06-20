import express, { NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import databaseService from './services/database.service'
import authRouter from './routes/auth.routes'
import usersRouter from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/defaultErrorHandler'

config()

const app = express()
const port = process.env.PORT || 3000

// Connect to the database
databaseService.connect()

// Middlewares
app.use(express.json())

// Routes
app.use('users', usersRouter)
app.use('/auth', authRouter)

// Error handler
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
