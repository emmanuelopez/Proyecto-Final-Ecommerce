import axios from 'axios'
import assert from 'assert'
import { crearServidor } from "../src/server.js";


let server

async function conectar({ port = 0 }) {
    return new Promise((resolve, reject) => {
        server = crearServidor().listen(3000, err => {
            if (err) {
                reject(err)
            } else {
                resolve(port)
            }
        })
    })
}

async function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

describe('servidor Mongo', () => {

    const url = "http://localhost:3000"
    const username = "admin@admin.com"
    const password = "1234"
    const productoID = "JDSPDIYL808NLOGEA9AFZ2"

    before(async () => {
        await conectar({ port: 8080 })
    })

    after(async () => {
        await desconectar()
    })


    describe('LOGIN', () => {
        describe('API GET /login', () => {
            it('deberia loguear al usuario y obtener el token', async () => {
                const { data } = await axios.post( url + '/login', {
                    "email":username,
                    "password":password
                })
                assert.ok(data.msg)
            })
        })
    })

    describe('PRODUCTOS', () => {
        describe('API GET api/productos', () => {
            it('deberia devolver todos los proudctos', async () => {
                const { status } = await axios.get( url + '/api/products')
                assert.strictEqual(status, 201)
            })
        })

        describe('API GET api/products/{PRODUCT_ID}', () => {
            it('deberia devolver la informacion del producto indicado', async () => {
                const { data } = await axios.get( url + '/api/products/' + productoID)
                assert.ok(data.id)
                assert.ok(data.name)
                assert.ok(data.price)
                assert.ok(data.stock)
            })
        })
    })
})
