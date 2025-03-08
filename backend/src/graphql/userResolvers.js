import User from '../models/User.js'

const userResolvers = {
  Query: {
    users: async (_, { page = 1, limit = 10 }) => {
      const skip = (page - 1) * limit
      const users = await User.find({})
        .select('-password -refreshToken')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })

      const total = await User.countDocuments()
      return {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
        },
      }
    },

    userById: async (_, { id }) => {
      const user = await User.findById(id).select('-password -refreshToken')
      if (!user) throw new Error('Utilisateur non trouvé.')
      return user
    },
  },

  Mutation: {
    updateUserById: async (_, { id, input }, context) => {
      const updatedUser = await User.findByIdAndUpdate(id, input, { new: true })

      if (!updatedUser) throw new Error('Utilisateur non trouvé.')

      return updatedUser
    },

    deleteUserById: async (_, { id }, context) => {
      const deletedUser = await User.findByIdAndDelete(id)

      if (!deletedUser) throw new Error('Utilisateur non trouvé.')

      return deletedUser
    },
  },
}

export default userResolvers
