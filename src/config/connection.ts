import {createConnection} from "typeorm";
import User from '../entity/User';
import Blog from '../entity/Blog';
import Category from '../entity/Category';
export async function createConnectionDB(){

    await createConnection({
        type: "mysql",
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'ts_project',
        synchronize: true,
        logging: true,
        entities: [User,Blog,Category]
    });
}