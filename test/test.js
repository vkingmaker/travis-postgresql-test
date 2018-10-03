'use strict';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../build/src/app');

let should = chai.should();

chai.use(chaiHttp);

// let client = new Client();

describe('FastFoodFast', () => {
  beforeEach((done) => {
    done();
  });

 /*
   * Test the /POST sign up route
   */

  describe('/SIGNUP user', () => {
    it('it should POST a user credentials to the database', (done) => {
      let user = {
        "username": "Monday Victor",
        "password": "akubudike1!"
      };
      chai.request(server)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  // });

    it('it should POST a user', (done) => {
      let user = {
        "username":"Monday Victor",
        "password":"akubudike1!"
      };
      chai.request(server)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          // res.body.should.have.property('success').eql('user registered successfully');
          console.log(res.body);
          done();
        });
    });
  });


   /*
   * Test the /POST login route
   */

  describe('/LOGIN user', () => {
    it('it should POST a user credentials to the database', (done) => {
      let user = {
        "username": "Monday Victor",
        "password": "akubudike1!"
      };
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  // });

    it('it should POST a user credential for login', (done) => {
      let user = {
        "username": "Monday Victor",
        "password": "akubudike1!"
      };
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          console.log(res.body);
          // res.body.should.have.property('success').eql('You must be a Registered user');
          done();
        });
    });
  });
  /*
   * Test the /GET route
   */
  // describe('/GET order', () => {
  //   it('it should GET all the orders', (done) => {
  //     chai.request(server)
  //       .get('/orders')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         res.body.length.should.be.eql(5);
  //         done();
  //       });
  //   });
  // });

  // describe('/POST order', () => {
  //   it('it should POST an Order if the ORDER property has a value', (done) => {
  //     let order = {
  //       "uid":2,
  //       "address":"7b Oyadiran Estate, Sabo ,Yaba",
  //       "instruction":"I love spicy food",
  //       "phone":"07031977216",
  //       "food":"Fried rice and grilled chicken"
  //     }

  //     chai.request(server)
  //       .post('/orders')
  //       .send(order)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         done();
  //       });
  //   });

  //   it('it should POST an order ', (done) => {
  //     let order = {
  //       "uid":2,
  //       "address":"7b Oyadiran Estate, Sabo ,Yaba",
  //       "instruction":"I love spicy food",
  //       "phone":"07031977216",
  //       "food":"Fried rice and grilled chicken"
  //     }

  //     chai.request(server)
  //       .post('/orders')
  //       .send(order)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Your order has been placed!');
  //         res.body.addedOrder.should.have.property('uid');
  //         res.body.addedOrder.should.have.property('address');
  //         res.body.addedOrder.should.have.property('instruction');
  //         res.body.addedOrder.should.have.property('phone');
  //         res.body.addedOrder.should.have.property('food');
  //         res.body.addedOrder.should.have.property('instruction');
  //         done();
  //       });
  //   });
  // });
});
