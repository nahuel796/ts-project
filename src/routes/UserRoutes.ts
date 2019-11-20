import express, {Express} from 'express';
import UserController from "../controllers/UserController";

class UserRoutes {

    public express :Express;
    private userController :UserController;

    constructor(){
        this.express = express();
        this.userController = new UserController();
        this.routes();
    }

    public routes(){
        this.express.post('/create', this.userController.store);
        this.express.get('/:id', this.userController.show);
    }

}

export default UserRoutes;