import express, {Express} from 'express';
import { checkJwt } from "../middlewares/checkJwtMiddleware";
import AuthController from "../controllers/AuthController";

class AuthRoutes {

    public express :Express;
    public authController :AuthController;

    constructor(){
        this.express = express();
        this.authController = new AuthController();
        this.routes();
    }

    public routes(){
        this.express.post('/login', this.authController.login);
        this.express.post('/change-password', [checkJwt], this.authController.changePassword);
    }

}

export default AuthRoutes;