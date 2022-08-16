import { Router } from 'express';
import  * as loginController from '../controllers/loginController.js';
import passport from '../passport/local-auth.js';


const loginRouter = Router()

//POST '/login' --> recibe email y password del usuario
loginRouter.post('/login', 
  passport.authenticate('login', {
    failureRedirect: '/failLogin'}),
    loginController.successLogin
);
    
loginRouter.get('/failLogin', loginController.failLogin);
loginRouter.post('/failLogin', loginController.failLogin);
loginRouter.get('/successLogin', loginController.successLogin);
loginRouter.post('/successLogin', loginController.successLogin);

//GET '/logout' --> Logout the user
loginRouter.post('/logout', loginController.logout);

export default loginRouter
