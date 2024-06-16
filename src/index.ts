import express from 'express'
import usersRoutes from './routes/users.routes'
import databaseService from './services/database.service'
import { config } from 'dotenv'

config()

const app = express()
const port = process.env.PORT || 3000

// Connect to the database
databaseService.run()

// Middlewares
app.use(express.json())

// Routes
app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
