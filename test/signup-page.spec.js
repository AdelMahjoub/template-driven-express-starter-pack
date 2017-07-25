const superTest = require('supertest');
const server = require('../server')['server'];

describe('landing page', function() {
  it('returns a html response', function(done) {
    superTest(server)
      .get('/signup')
      .set('Accept', 'text/html')
      .expect('Content-type', /text\/html/)
      .expect(200)
      .end(done)
  });
});