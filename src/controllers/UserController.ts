import {Request, Response} from 'express';
import {getManager} from "typeorm";
import User from '../entity/User';

class UserController {

    public async store(req: Request, res: Response) {
        const entityManager = getManager();
        const user = new User();
        const {email, password} = req.body;

        email ? user.email = email : user.email = null;
        password ? user.password = password : user.password = null;

        try {
            await entityManager.save(user);
        } catch (error) {
            res.status(500).send(error);
        }
        res.status(200).send(user);
    }

    public async show(req: Request, res: Response) {
        const entityManager = getManager();
        const {id} = req.params;
        const user = await entityManager.findOne(User, id);

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(200).send('no existe');
        }
    }
}

export default UserController;