/* eslint-disable prettier/prettier */
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client';

describe('ItemsController (e2e)', () => {
  const prisma = new PrismaClient();
  const url = process.env.APP_URL;
  const insertItem = {
    name: 'monitor',
    description: 'kayak gini lah',
    quantity: 4,
    roomId: 1,
  };

  beforeAll(async () => {
    await prisma.users.deleteMany();
  });

  it('/items (POST)', () => {
    return request(url).post('/items').send(insertItem).expect(201);
  });

  it('/auth/login (GET)', () => {
    return request(url).get('/items').expect(200);
  });
});
