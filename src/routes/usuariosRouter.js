import { Router } from 'express';
import  * as usuariosController from '../controllers/usuariosController.js';
import { mdwValidateSchemaNewUsuario } from '../middlewares/usuariosMDW.js';
import passport from '../passport/local-auth.js';


const usuariosRouter = new Router();

//GET '/' --> obtiene todos los usuarios
usuariosRouter.get('/allUsers', usuariosController.getAll);

//POST '/register' --> para dar de alta un nuevo usuario
usuariosRouter.post('/api/users', mdwValidateSchemaNewUsuario, 
    passport.authenticate('registro', {
    failureRedirect: '/failRegister'}),
    usuariosController.successRegister
);

usuariosRouter.get('/failRegister', usuariosController.failRegister);
usuariosRouter.post('/failRegister', usuariosController.failRegister);
usuariosRouter.get('/successRegister', usuariosController.successRegister);
usuariosRouter.post('/successRegister', usuariosController.successRegister);

//DELETE '/:email' --> elimina un usuario segun el email pasado por parametro
usuariosRouter.delete('/bajaUsuario/:email', usuariosController.borrarUsuario);

export default usuariosRouter
