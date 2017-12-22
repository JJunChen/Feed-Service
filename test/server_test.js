const { expect } = require('chai');
const chai = require('chai');
const supertest = require('supertest');
const chaiHttp = require('chai-http');
const server = require('../server/index.js');

chai.use(chaiHttp);

describe('Server', () => {
  it('should return 200 from /feeds/:user_id', (done) => {
    chai
      .request(server)
      .get('/feed/7')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 201 from /tweets/', (done) => {
    chai
      .request(server)
      .post('/tweets')
      .send({ tweet: { tweet_id: 'cz34m6jthsibj7m7ts', isad: false }, users: [1000] })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});
