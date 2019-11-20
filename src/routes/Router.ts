import {Express} from 'express';
import bodyParser = require('body-parser');
import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';

class Router {

    private express :Express;

    constructor(express :Express){
        this.express = express;
    }

    public up(){
        this.routes()
    }

    private routes(){
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());

        this.express.use('/user', new UserRoutes().express);
        this.express.use('/auth', new AuthRoutes().express);
    }

}

export default Router;