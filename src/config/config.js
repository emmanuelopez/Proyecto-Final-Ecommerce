import  dotenv  from 'dotenv';
import parseArgs from 'minimist';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';
dotenv.config();


const options= {alias:{p:"port", m:"modo"}};
const puerto = parseArgs(process.argv,options).port;
const modo = parseArgs(process.argv,options).modo;

export const jwtOpts = {
    secretOrKey: process.env.SECRET || 'TOP_SECRET',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: process.env.JWT_IGNORE_EXPIRE || false,
    expireIn: parseInt(process.env.JWT_TIME_EXPIRE) || 3600,
}

export const ServidorEnvioEmail = {
    service: process.env.MAIL_SMTP,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
}

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: puerto || process.env.PORT,
    MODO: modo,
    MONGODB_URL: process.env.MONGODB_URL || 'noURL',
    MONGO_DB: process.env.MONGO_BASE || 'ecommerce',
    EMAIL_ADMINISTRADOR: process.env.MAIL_ADMIN
}
