import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { CONFIG } from '.';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, ENVIRONMENT } =
    CONFIG;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: ENVIRONMENT === 'test' || ENVIRONMENT === 'dev',
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
