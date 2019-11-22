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
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: 14400
            });
            res.status(200).send(token);
        } else {
            res.status(200).send('no existe');
        }
    }

    public async changePassword(req: Request, res: Response) {
        const entityManager = getManager();
        const {email,oldPassword,newPassword} = req.body;

        const checkPassword = await entityManager
            .createQueryBuilder(User, "user")
            .where("user.email = :email AND user.password = :oldPassword", { email: email, oldPassword: oldPassword })
            .getOne();

        let updateUser;

        if(checkPassword){
            updateUser = await entityManager
                .createQueryBuilder()
                .update(User)
                .set({ password: newPassword})
                .where("email = :email", { email: email })
                .execute();
        }else{
            updateUser = false;
        }

        if (updateUser) {
            res.status(200).send("Contaseña cambiada");
        } else {
            res.status(200).send('No se pudo cambiar');
        }
    }

}

export default AuthController;