import { logger } from './src/config/logger';
import app from './src/app';
import { CONFIG } from './src/config';

const port = CONFIG.PORT || 8000;
const startServer = async (port: number) => {
    try {
        app.listen(port, () => {
            logger.info(`Server running on ${port}`);
        });
    } catch (error: unknown) {
        typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            logger.error(error.message);
    }
};

startServer(port as number);
