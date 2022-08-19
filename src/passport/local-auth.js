import passport from 'passport';
import { Strategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { jwtOpts } from '../config/config.js';
import { validarToken } from '../controllers/usuariosController.js';
import logger from '../logger.js';
import globals from 'globals'
import {
  crearUsuario,
  login,
  existeEmail
} from '../services/usuariosService.js';


//Creation of passport strategies

passport.use('registro', new Strategy({passReqToCallback: true, usernameField: 'email'},
  async (req, username, password, done) => {
    logger.info(`local-auth.js - passport.use --> registro`)
    const { email } = req.body
    const user = await existeEmail(email)
    if (user) {
      return done(null, false)
    }
    const newUser = req.body
    await crearUsuario(newUser);
    done(null, newUser);
  }
));
      
passport.use('login', new Strategy({usernameField: 'email'},
  async (email, password, done) => {
    logger.info(`local-auth.js - passport.use --> login`);
    globals.emailUser = email;
    try {
      const user = await login(email, password);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      logger.error(error);
      return done(null, false);
    }
  }
));

passport.serializeUser((user, done) => {
  logger.info(`local-auth.js - passport.serializeUser`)
  done(null, user);
});
        
passport.deserializeUser((user, done) => {
  logger.info(`local-auth.js - passport.deserializeUser`)
  done(null, user);
});

passport.use('jwt', new JWTstrategy(jwtOpts, validarToken));

export default passport
