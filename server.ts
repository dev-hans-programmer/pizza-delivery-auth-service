import app from './src/app';
import { CONFIG } from './src/config';

const port = CONFIG.PORT || 8000;
const startServer = async (port: number) => {
    try {
        app.listen(port, () => {
            // console.log(`Server running on ${port}`);
        });
    } catch (error) {
        // console.log(error);
    }
};

startServer(port as number);
