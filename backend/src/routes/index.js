import csrf from 'csurf'
import authRoutes from './authRoutes.js'
import productRoutes from './productRoutes.js'
import userRoutes from './userRoutes.js'

// CSRF Protection Middleware
const csrfProtection = csrf({ cookie: true })
export const configureRoutes = (app) => {
  // Auth routes
  app.use('/api/auth', csrfProtection, authRoutes)
  app.use('/api/users', csrfProtection, userRoutes)

  // Product routes
  app.use('/api/products', productRoutes)

  // 404 handler - should be the last route
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Cannot ${req.method} ${req.originalUrl}`,
    })
  })
}
