import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import notFoundRoute from './app/middlewares/notFroundRoute'

const app: Application = express()

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://api.imgbb.com'],
  credentials: true,
}

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

// Routes
app.use('/api', router)

// Global Error Handler
app.use(globalErrorHandler)

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Bike Rental Server Running...',
  })
})

// 404 Route
app.use(notFoundRoute)

export default app
