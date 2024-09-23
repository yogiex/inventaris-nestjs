/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateRoom } from 'src/rooms/dto/rooms';

describe('RoomsController (e2e)', () => {
  const url = 'http://localhost:3000';
  //   const url = process.env.APP_URL;

  const createRoom: CreateRoom = {
    name: 'Gudang 2',
    address: 'Telkom University Landmark Tower',
    number: '0699',
    building: 'TULT',
  };

  it('/rooms (GET)', () => {
    return request(url).get('/rooms').expect(200);
  });

  it('/rooms (POST)', () => {
    return request(url).post('/rooms').send(createRoom).expect(201);
  });
});
