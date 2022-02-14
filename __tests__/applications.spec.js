const request = require('supertest');
const app = require('../app.js');
const { pool } = require('../src/db.js');

afterEach((done) => {
  jest.clearAllMocks();
  done();
});

afterAll((done) => {
  pool.end();
  done();
});

it('should respond with a 200 status code', (done) => {
  request(app)
    .post('/api/applications')
    .send({
      first_name: 'john',
      last_name: 'snow',
    })
    .then((response) => {
      expect(response.status).toBe(201);
      done();
    });
});

it('return a message when an application was created', (done) => {
  request(app)
    .post('/api/applications')
    .send({
      first_name: 'john',
      last_name: 'snow',
    })
    .then((response) => {
      expect(response.body.message).toBe('application created');
      done();
    });
});

it('call the external api to create the application with status "pending"', (done) => {
  const res = { first_name: 'john', last_name: 'snow' };
  request(app)
    .post('/api/applications')
    .send({
      first_name: 'john',
      last_name: 'snow',
    })
    .then((response) => {
      expect(response.body.status).toBe('pending');
      done();
    });
});
