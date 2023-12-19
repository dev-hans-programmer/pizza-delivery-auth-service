import 'reflect-metadata';
import { logger } from './src/config/logger';
import app from './src/app';
import { CONFIG } from './src/config';

const port = CONFIG.PORT || 8000;
const startServer = (port: number) => {
    try {
        app.listen(port, () => {
            logger.info(
                `Server running on ${port} in ${process.env.NODE_ENV} mode`,
            );
        });
    } catch (error: unknown) {
        error instanceof Error
            ? logger.error(error.message)
            : logger.error('Something went wrong while running the server');
    }
};

startServer(port as number);
