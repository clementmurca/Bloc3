import User from '../models/User.js'
import { generateToken, generateRefreshToken } from '../utils/jwt.js'

const authResolvers = {
  Mutation: {
    signup: async (_, { email, phoneNumber, role = 'user', ...rest }) => {
      const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      })

      if (existingUser) {
        throw new Error('Email ou numéro de téléphone déjà utilisé.')
      }

      const user = await User.create({ ...rest, email, phoneNumber, role })
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }
    },

    login: async (_, { identifier, password }) => {
      const user = await User.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      }).select('+password')

      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Identifiants invalides.')
      }

      const accessToken = generateToken(user._id)
      const refreshToken = generateRefreshToken(user._id)

      user.refreshToken = refreshToken
      await user.save()

      return {
        tokens: { accessToken, refreshToken },
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      }
    },
  },
}

export default authResolvers
