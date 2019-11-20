import {Request, Response} from 'express';
import {getManager} from "typeorm";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import User from '../entity/User';

class AuthController {

    public async login(req: Request, res: Response) {
        const entityManager = getManager();
        const {email,password} = req.body;

        const user = await entityManager
            .createQueryBuilder(User, "user")
            .where("user.email = :email AND user.password = :password", { email: email, password: password })
            .getOne();

        if (user) {
            const token = jwt.sign(
                { userId: user.id, username: user.email },
                config.jwtSecret,
                { expiresIn: "1h" }
            );
            res.status(200).send(token);
        } else {
            res.status(200).send('no existe');
        }
    }

    public async changePassword(req: Request, res: Response) {
        const entityManager = getManager();
        const {oldpassword,newpassword} = req.params;
        const id = res.locals.jwtPayload.userId;

        const user = await entityManager
            .createQueryBuilder(User, "user")
            .where("user.password = :password", {password: newpassword })
            .getOne();

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(200).send('no existe');
        }
    }

}

export default AuthController;