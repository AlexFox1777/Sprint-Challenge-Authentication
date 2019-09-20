const db = require('../database/dbConfig');

describe('hobbits model', () => {

    beforeEach(async () => {
        await db('users').truncate();
    });

    it('should return environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('insert()', () => {
        it('should insert users', async () => {

            // insert a record
            const [id] = await db('users').insert({username: 'sasha', password: "sasha"});

            let user = await db('users')
                .where({id})
                .first();

            // assert the record was inserted
            expect(user.username).toBe('sasha');
        });

    });

});