import cookieParser from 'cookie-parser'
import express from 'express'
import router from './app/routes'
import cors from 'cors'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import notFoundRoute from './app/middlewares/notFoundRoute'
const app = express()

// parsers

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bike Rental Service Backend Server',
  })
})

app.use('/api', router)

app.use(globalErrorHandler)

app.all('*', notFoundRoute)

export default app
