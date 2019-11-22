import express, {Express} from 'express';
import CheckAuth from "../middlewares/CheckAuthMiddleware";
import AuthController from "../controllers/AuthController";

class AuthRoutes {

    public express :Express;
    public authController :AuthController;
    public checkAuth :CheckAuth;

    constructor(){
        this.express = express();
        this.authController = new AuthController();
        this.checkAuth = new CheckAuth();
        this.routes();
    }

    public routes(){
        this.express.post('/login', this.authController.login);
        this.express.post('/change-password', this.checkAuth.protectedRoute, this.authController.changePassword);
    }

}

export default AuthRoutes;