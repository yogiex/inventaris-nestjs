/* eslint-disable prettier/prettier */
import * as request from 'supertest';

describe('SupplierController (e2e)', () => {
  //   const url = 'http://localhost:3000';
  const url = process.env.APP_URL;

  it('/ (GET)', () => {
    return request(url).get('/supplier').expect(200);
  });
});
