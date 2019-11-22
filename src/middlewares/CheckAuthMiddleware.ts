import express, {Request, Response, Express} from 'express';
import * as jwt from "jsonwebtoken";
import config from "../config/config";

class CheckAuthMiddleware{
    public protectedRoute: Express;

    constructor(){
        this.protectedRoute = express.Router();
        this.checkToken();
    }

    public checkToken(){
        this.protectedRoute.use((req, res, next) => {
            const token = req.headers['access-token'];

            if (token) {
                jwt.verify(token, config.jwtSecret, (err, decoded) => {
                    if (err) {
                        return res.json({ mensaje: 'Token inválida' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                res.send({
                    mensaje: 'Token no proveída.'
                });
            }
        });
    }
}

export default CheckAuthMiddleware;