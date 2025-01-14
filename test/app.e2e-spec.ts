/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  const url = 'http://localhost:3000';
  // const url = process.env.APP_URL;

  it('/ (GET)', () => {
    return request(url).get('/').expect(200).expect('Hello World!');
  });
});
