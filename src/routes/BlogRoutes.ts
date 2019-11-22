import express, {Express} from 'express';
import CheckAuth from "../middlewares/CheckAuthMiddleware";
import BlogController from "../controllers/BlogController";

class BlogRoutes {

    public express :Express;
    public blogController :BlogController;
    public checkAuth :CheckAuth;

    constructor(){
        this.express = express();
        this.blogController = new BlogController();
        this.checkAuth = new CheckAuth();
        this.routes();
    }

    public routes(){
        this.express.post('/create', this.checkAuth.protectedRoute, this.blogController.store);
        this.express.get('/:id', this.checkAuth.protectedRoute, this.blogController.show);
    }

}

export default BlogRoutes;