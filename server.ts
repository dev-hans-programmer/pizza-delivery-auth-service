import 'reflect-metadata';
import { logger } from './src/config/logger';
import app from './src/app';
import { CONFIG } from './src/config';
import { AppDataSource } from './src/config/data-source';
import { DataSource } from 'typeorm';

const port = CONFIG.PORT || 8000;

const initializeDb = async () => {
    return AppDataSource.initialize();
};

const startServer = async (port: number) => {
    let connection: DataSource | null = null;
    try {
        connection = await initializeDb();
        await connection.synchronize();

        app.listen(port, () => {
            logger.info(
                `Server running on ${port} in ${process.env.NODE_ENV} mode`,
            );
        });
    } catch (error: unknown) {
        if (connection) void connection.destroy();
        error instanceof Error
            ? logger.error(error.message)
            : logger.error('Something went wrong while running the server');
    }
};

void startServer(port as number);
