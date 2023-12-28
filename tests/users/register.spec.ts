import app from '../../src/app';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source';
import { User } from '../../src/entity/User';
import { UserRoles } from '../../src/constants';

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // Database truncate
        await connection.dropDatabase();
        await connection.synchronize();
        // await truncateTable(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe('Given all fields', () => {
        it('should return the 201 status code', async () => {
            // AAA: Arrange, Act, Assert
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secretupdated',
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
                password: 'secretupdated',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(user);

            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });
        it('should persist the user in the database', async () => {
            // Arrange
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secretupdated',
            };

            // Act
            await request(app).post('/auth/register').send(user);
            const userRepo = connection.getRepository(User);
            const users = await userRepo.find();

            // Assert
            expect(users).toHaveLength(1);
            expect(users[0].email).toBe(user.email);
        });

        it('Should return an id of the created user', async () => {
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secretupdated',
            };

            // Act
            const createdUser = await request(app)
                .post('/auth/register')
                .send(user);
            const userRepo = connection.getRepository(User);
            const users = await userRepo.find();

            // Assert
            const id = +createdUser.text.split(':')[1].replace('}', '');
            expect(users[0].id).toEqual(id);
        });

        it('Should have customer role', async () => {
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secretupdated',
                role: 'customer',
            };

            // Act
            await request(app).post('/auth/register').send(user);
            const userRepo = connection.getRepository(User);
            const users = await userRepo.find();

            expect(users[0]).toHaveProperty('role');
            expect(users[0].role).toEqual(UserRoles.CUSTOMER);
        });

        it('Should store the hashed password', async () => {
            const user = {
                firstName: 'Hasan',
                lastName: 'Ali',
                email: 'hans@gmail.com',
                password: 'secretupdated',
                role: 'customer',
            };

            // Act
            await request(app).post('/auth/register').send(user);
            const userRepo = connection.getRepository(User);
            const users = await userRepo.find();

            expect(users[0].password).not.toBe(user.password);
            expect(users[0].password).toHaveLength(60);
            expect(users[0].password).toMatch(/^\$2a\$\d+\$/);
        });
    });
});
