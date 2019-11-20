import express, {Express} from 'express';
import Router from './routes/Router';
import "reflect-metadata";
import {createConnectionDB} from './config/connection';

class App {

    private readonly express :Express;
    private router: Router;

    constructor(){
        this.express = express();
        createConnectionDB();
        this.router = new Router(this.express);
    }

    public run(){
        this.upServer();
        this.router.up();
    }

    private upServer(){
        this.express.listen(3000, function(){
            console.log('Server is run in port 3000');
        });
    }

}

const app = new App();
app.run();