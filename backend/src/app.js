import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { swaggerSpec, swaggerUi } from '../swagger.js'
import passport from './config/passport.js'
import { configureBasicMiddleware } from './middleware/basicMiddleware.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { configureSecurity } from './middleware/securityMiddleware.js'
import sessionConfig from './middleware/sessionConfig.js'
import { configureRoutes } from './routes/index.js'

dotenv.config()

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // with vite
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'Cache-Control'],
  exposedHeaders: ['X-CSRF-Token'],
}

app.use(cors(corsOptions))
app.use(passport.initialize())

configureBasicMiddleware(app)

app.use(sessionConfig)

app.use(cookieParser())

// Route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/api', (req, res) => {
  res.json({ message: 'Server is working!' })
})

configureSecurity(app)

// Configure Routes
configureRoutes(app)

//handle errors
app.use(errorHandler)
app.use(notFound)

export default app
