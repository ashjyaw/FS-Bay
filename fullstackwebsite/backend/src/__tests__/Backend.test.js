const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;
const login = {
  'email': 'CSE186student@ucsc.edu',
  'password': 'mollymember',
};
let akey = '';
beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('Login test', async () => {
  const a = await request.post('/v0/login').send(login)
    .expect(200);
  akey = a.body.accessToken;
});

test('Login test invalid', async () => {
  await request.post('/v0/login').send({
    'email': 'CSE186student@ucsc.edu',
    'password': 'mollymemr',
  })
    .expect(401);
});

test('get all emails', async () => {
  await request.get('/v0/mail').set('Authorization', `Bearer ${akey}`)
    .expect(200);
});

test('get all emails invalidkey', async () => {
  await request.get('/v0/mail').set('Authorization', `Bearer a`)
    .expect(403);
});
test('get all emails no key', async () => {
  await request.get('/v0/mail')
    .expect(401);
});
