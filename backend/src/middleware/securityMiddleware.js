import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import helmet from 'helmet'
import hpp from 'hpp'

export const configureSecurity = app => {
  // Parse cookies to support CSRF tokens
  app.use(cookieParser())

  // Use Helmet to set various HTTP headers for security
  app.use(helmet())

  // Prevent HTTP parameter pollution
  app.use(hpp())

  const csrfProtection = csrf({ cookie: true })

  // Expose CSRF token route
  app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
  })

  // Add content security policy (CSP) to prevent XSS attacks
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://accounts.google.com'],
        objectSrc: ["'none'"],
        frameSrc: ["'self'", 'https://accounts.google.com'],
        imgSrc: ["'self'", 'data:', 'https://*.googleusercontent.com'],
        upgradeInsecureRequests: []
      }
    })
  )

  // Prevent clickjacking attacks
  app.use(helmet.frameguard({ action: 'deny' }))

  // Hide X-Powered-By header to obscure server technology
  app.disable('x-powered-by')

  console.log('Security middleware configured.')
}
