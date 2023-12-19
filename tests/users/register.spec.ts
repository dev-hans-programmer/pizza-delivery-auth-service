import app from '../../src/app';
import request from 'supertest';

describe('POST /auth/register', () => {
    describe('Given all fields', () => {
        it('should return the 201 status code', async () => {
            // AAA: Arrange, Act, Assert
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secret',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(user);

            expect(response.statusCode).toBe(201);
        });
        it('Should return valid json response', async () => {
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secret',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(user);

            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });
    });
});
