import express from 'express'
import passport from './passport/local-auth.js'
import session from 'express-session'
import apiRouter from './routes/apiRouter.js'
import webRouter from './routes/webRouter.js'
import defaultRouter from './routes/defaultRouter.js'
import infoRouter from './routes/infoRouter.js'
import loginRouter from './routes/loginRouter.js'


export function crearServidor() {
    
    const app = express()
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true })); //es para recibir los datos de un formulario
    
    app.set('view engine', 'ejs') //Configuracion del motor de vistas
    
    app.use(session({
        secret: "mysecretsession",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    }));
    
    app.use(passport.initialize()) 
    app.use(passport.session());

    // routes apiRestFull
    app.use('/web', webRouter)
    app.use('/', loginRouter)
    app.use('/api', apiRouter)
    app.use('/info', infoRouter)
    app.use('/*', defaultRouter)

    return app
}
