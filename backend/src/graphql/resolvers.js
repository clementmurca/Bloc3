import Product from '../models/Product.js'
import User from '../models/User.js'
import authResolvers from './authResolvers.js'
import productResolvers from './productResolvers.js'
import userResolvers from './userResolvers.js'

const resolvers = {
  Query: {
    // Fusion des Queries existantes
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...productResolvers.Query,

    // Ajout des Queries globales si nécessaires
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    // Fusion des Mutations existantes
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,

    // Ajout des Mutations globales si nécessaires
    createProduct: async (_, { name, price, stock }) => {
      const product = new Product({ name, price, stock })
      return await product.save()
    },
    createUser: async (_, { firstName, lastName, email }) => {
      const user = new User({ firstName, lastName, email })
      return await user.save()
    },
  },
}

export default resolvers
