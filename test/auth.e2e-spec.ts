/* eslint-disable prettier/prettier */
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client';

describe('AuthController (e2e)', () => {
  const prisma = new PrismaClient();
  const url = process.env.APP_URL;
  const register = {
    username: 'admin1',
    password: 'admin@123',
    role: 1,
  };

  const login = {
    username: 'admin1',
    password: 'admin@123',
  };

  beforeAll(async () => {
    await prisma.users.deleteMany();
  });

  it('/auth/register (POST)', () => {
    return request(url).post('/auth/register').send(register).expect(201);
  });

  it('/auth/login (POST)', () => {
    return request(url).post('/auth/login').send(login).expect(201);
  });
});
