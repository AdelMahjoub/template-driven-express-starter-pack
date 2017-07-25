const superTest = require('supertest');
const app = require('../server');

describe('landing page', function() {
  it('returns a html response', function(done) {
    superTest(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-type', /text\/html/)
      .expect(200)
      .end(done)
  });
});