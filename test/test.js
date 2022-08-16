import axios from 'axios'
import { conectar, desconectar } from '../src/server.js'

await conectar()

const serverUrl = 'http://localhost:8080/api/products'

await axios.post(serverUrl, {
    name: "Lovaglio Malbec",
    description: "Vino uva Malbec linea Lovaglio",
    price: 950,
    image: "/public/uploads/products/product_default.png",
    stock: 100,
},)

const { data: productos } = await axios.get(serverUrl)

console.log(productos)

await desconectar()