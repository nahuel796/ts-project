import express, {Express} from 'express';
import CheckAuth from "../middlewares/CheckAuthMiddleware";
import CategoryController from "../controllers/CategoryController";

class CategoryRoutes {

    public express :Express;
    public categoryController :CategoryController;
    public checkAuth :CheckAuth;

    constructor(){
        this.express = express();
        this.categoryController = new CategoryController();
        this.checkAuth = new CheckAuth();
        this.routes();
    }

    public routes(){
        this.express.post('/create', this.checkAuth.protectedRoute, this.categoryController.store);
        this.express.get('/:id', this.checkAuth.protectedRoute, this.categoryController.show);
    }

}

export default CategoryRoutes;