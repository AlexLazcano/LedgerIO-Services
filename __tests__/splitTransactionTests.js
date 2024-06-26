
const request = require('supertest');
const app = require('../app');


describe('Split Transaction Service', () => {

    // beforeAll(done => {
       
    // });

    afterAll(done => {
        app.close();
        done();
    });



    test('POST /createSplitTransaction should create a new split transaction', async () => {

        const reqBody = {
            sender: '65ea41d1354b412b1d53d2f7',
            recipient: '65eb8612d3a9db14c0e4c488',
            total: 100,
            splitAmount: 50,
            date: new Date(),
            description: 'Test Split Transaction'
        };

        const response = await request(app)
            .post('/splitTransactions')
            .send(reqBody)
            .expect(201);


        const { sender, recipient, total, splitAmount, date, description, _id } = response.body;

        expect(_id).toBeDefined();
        expect(sender).toBe(reqBody.sender);
        expect(recipient).toBe(reqBody.recipient);
        expect(total).toBe(reqBody.total);
        expect(splitAmount).toBe(reqBody.splitAmount);
        expect(response.body).toHaveProperty('date');
        expect(description).toBe(reqBody.description);


        await request(app)
            .delete(`/splitTransactions/${_id}`)
            .expect(200);
        // Add more assertions as needed
    });

    test('POST /getAllSplitTransactions should create a new split transaction', async () => {

        const reqBody = {
            sender: '65ea41d1354b412b1d53d2f7',
            recipient: '65eb8612d3a9db14c0e4c488',
            total: 100,
            splitAmount: 50,
            date: new Date(),
            description: 'Test Split Transaction'
        };

        const response = await request(app)
            .post('/splitTransactions')
            .send(reqBody)
            .expect(201);


       const getResponse = await request(app)
            .get('/splitTransactions')
            .expect(200);


        const { sender, recipient, total, splitAmount, date, description, _id } = getResponse.body[0];

        console.log("first", getResponse.body[0]);

        expect(_id).toBeDefined();
        expect(sender).toHaveProperty('name');
        expect(sender.id).toBe(reqBody.sender);
        expect(recipient).toHaveProperty('id');
        expect(recipient).toHaveProperty('name');
        expect(recipient.id).toBe(reqBody.recipient);
        expect(total).toBe(reqBody.total);
        expect(splitAmount).toBe(reqBody.splitAmount);
        
        expect(description).toBe(reqBody.description);

        await request(app)
            .delete(`/splitTransactions/${_id}`)
            .expect(200);
        // Add more assertions as needed
    });

});
