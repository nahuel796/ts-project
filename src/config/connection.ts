import {createConnection} from "typeorm";
import User from '../entity/User';
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
        entities: [User]
    });
}