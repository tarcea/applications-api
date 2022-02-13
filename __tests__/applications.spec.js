const request = require('supertest');
const app = require('../app.js');
const checkStatus = require('../middlewares/checkStatus.js');
const { pool } = require('../src/db.js');

jest.mock('../middlewares/checkStatus.js', () =>
  jest.fn((req, res, next) => next())
);

afterEach((done) => {
  jest.clearAllMocks();
  done();
});

afterAll((done) => {
  pool.end();
  done();
});

it(`should use "checkStatus" for a request to "/api/applications?status=rejected"`, async () => {
  await request(app).get('/api/applications?status=rejected');
  expect(checkStatus).toBeCalledTimes(1);
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
// it('call the external api to create the application', (done) => {
//   const res = { first_name: 'john', last_name: 'snow' };
//   request(app)
//     .post('/api/applications')
//     .send({
//       first_name: 'john',
//       last_name: 'snow',
//     })
//     .then((response) => {
//       // console.log(response.body.application);
//       expect(JSON.stringify(response.body.application)).toBe(
//         JSON.stringify(res)
//       );
//       done();
//     });
// }, 55000);
