import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { 
  obtenerProductos, 
  obtenerProducto, 
  generarProducto, 
  borrarProducto 
} from '../controllers/productosGraphqlController.js';


const schema = buildSchema(`
  input ProductoInput {
    name: String
    description: String
    price: Int
    image: String
    stock: Int
  }
  type Producto {
    id: ID!
    name: String
    description: String
    price: Int    
    image: String
    stock: Int
  }
  type Query {
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto
  }
  type Mutation {
    generarProducto(datos: ProductoInput!): Producto
    borrarProducto(id: ID!): Producto
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    obtenerProductos,
    obtenerProducto,
    borrarProducto,
    generarProducto,
  },
  graphiql: true,
})