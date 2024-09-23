/* eslint-disable prettier/prettier */
import * as request from 'supertest';
import { CreateRoom } from 'src/rooms/dto/rooms';
import { PrismaClient } from '@prisma/client';

describe('RoomsController (e2e)', () => {
  const url = 'http://localhost:3000';
  //   const url = process.env.APP_URL;

  const prisma = new PrismaClient();
  const createRoom: CreateRoom = {
    name: 'Gudang 2',
    address: 'Telkom University Landmark Tower',
    number: '0699',
    building: 'TULT',
  };

  beforeAll(async () => {
    await prisma.room.deleteMany();
  });
  it('/rooms (GET)', () => {
    return request(url).get('/rooms').expect(200);
  });

  it('/rooms (POST)', () => {
    return request(url).post('/rooms').send(createRoom).expect(201);
  });
});
