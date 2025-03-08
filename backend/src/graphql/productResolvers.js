import Product from '../models/Product.js'

const productResolvers = {
  Query: {
    products: async () => await Product.find(),
    productByCode: async (_, { code }) => {
      const product = await Product.findOne({ code })

      if (!product) throw new Error('Produit non trouvé.')

      return product
    },
  },

  Mutation: {
    updateProductStockByCode: async (_, { code, stock }) => {
      const product = await Product.findOneAndUpdate({ code }, { stock }, { new: true })

      if (!product) throw new Error('Produit non trouvé.')

      return product
    },

    importMultipleProductsFromAPI: async () => {
      // Exemple d'importation de produits depuis une API externe.
    },
  },
}

export default productResolvers
