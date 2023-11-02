import passport from "passport";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Request, Response, NextFunction } from "express";

import { User } from "../models/User";

const naoAutorizado = { status: 401, message: 'Não autorizado' };

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN as string
};

dotenv.config();

passport.use(new JWTStrategy(options, async (payload, done) => {

    const user = await User.findByPk(payload.id);
    if (user) {
        return done(null, user);
    } else {
        return done(naoAutorizado, false);
    }
}));

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_TOKEN as string);
}

export const privateRouter = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (err: any, user: string) => {
        req.user = user;
        if (user) {
            next();
        } else {
            next(naoAutorizado);
        }
    });
    authFunction(req, res, next);
};

export default passport;