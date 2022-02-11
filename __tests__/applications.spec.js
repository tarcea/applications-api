const request = require('supertest');
const app = require('../app.js');

it('should respond with a 200 status code', (done) => {
  request(app)
    .post('/api/applications')
    .send({
      first_name: 'john',
      last_name: 'snow',
    })
    .then((response) => {
      expect(response.status).toBe(200);
      done();
    });
}, 20000);

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
}, 20000);
it('call the external api to create the application', (done) => {
  const res = { first_name: 'john', last_name: 'snow' };
  request(app)
    .post('/api/applications')
    .send({
      first_name: 'john',
      last_name: 'snow',
    })
    .then((response) => {
      // console.log(response.body.application);
      expect(JSON.stringify(response.body.application)).toBe(
        JSON.stringify(res)
      );
      done();
    });
}, 55000);
