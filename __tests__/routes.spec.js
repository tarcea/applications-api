import request from 'supertest';
import app from '../app.js';

it('should respond with a 200 status code', (done) => {
  request(app)
    .post('/api/applications')
    .send({
      first_name: 'ion',
      last_name: 'vasile',
    })
    .expect(200, done);
});
