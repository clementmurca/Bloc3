import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import session from 'express-session'

dotenv.config()

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Replace with a strong secret
  resave: false, // Avoid resaving unchanged sessions
  saveUninitialized: false, // Do not save empty sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // MongoDB URI
    collectionName: 'sessions' // Collection name
  }),
  cookie: {
    httpOnly: true, // Prevent XSS attacks
    secure: false, // Only set cookies over https. Server will not send back a cookie over http.
    //secure: process.env.NODE_ENV === 'production', // Only allow cookies over HTTPS in production
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
})

export default sessionConfig
