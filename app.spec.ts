import app from './src/app';
import request from 'supertest';
import { calculateDiscount } from './src/utils';

describe.skip('App', () => {
    it('should calculate discount', () => {
        const discount = calculateDiscount(100, 10);
        expect(discount).toBe(10);
    });
    it('should return 200', async () => {
        const result = await request(app).get('/').send();
        expect(result.statusCode).toBe(200);
    });
});
