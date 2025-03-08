import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Product {
    id: ID!
    code: String
    name: String
    brand: String
    price: Float
    stock: Int
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createProduct(name: String!, price: Float!, stock: Int!): Product
    createUser(firstName: String!, lastName: String!, email: String!): User
  }
`

export default typeDefs
