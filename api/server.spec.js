//Test our server. Request a library

const request = require('supertest');
const server = require('./server');

//Declare global test with jest using describe

describe('server.js', () => {
    // verify that the API endpoint returns the correct HTTP status code
    describe('GET/', () => {
        it('It returns 200 OK', () => {
            //whenever you test something async you are gonna return it
            // make a GET request to the / endpoint on the server
            return request(server)
                .get('/')
                .then(res => {
                    //assert that we get an http status code 200
                    expect(res.status).toBe(200);
                })
        });

        // verify that the API endpoint returns the `expected value`
        it('should return "Server is up" ', async () => {
            const res = await request(server).get('/');
            expect(res.body).toBe("Server is up");
        });

        // check that we are using the right format (HTML, XML, JSON)
        it("return JSON", done => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    done();
                })
        })
    })
});