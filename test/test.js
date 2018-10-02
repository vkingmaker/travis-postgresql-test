'use strict';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../build/src/app');

let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Order', () => {
  beforeEach((done) => { //Before each test we empty the database
    done();
  });

describe('/POST order', () => {
  it('it should POST an Order if the ORDER property has a value', (done) => {
    let order = {
      "uid":2,
      "address":"7b Oyadiran Estate, Sabo ,Yaba",
      "instruction":"I love spicy food",
      "phone":"07031977216",
      "food":"Fried rice and grilled chicken"
    }
    
    chai.request(server)
      .post('/orders')
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  
  it('it should POST an order ', (done) => {
    let order = {
      "uid":2,
      "address":"7b Oyadiran Estate, Sabo ,Yaba",
      "instruction":"I love spicy food",
      "phone":"07031977216",
      "food":"Fried rice and grilled chicken"
    }
    
    chai.request(server)
      .post('/orders')
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Your order has been placed!');
        res.body.addedOrder.should.have.property('uid');
        res.body.addedOrder.should.have.property('address');
        res.body.addedOrder.should.have.property('instruction');
        res.body.addedOrder.should.have.property('phone');
        res.body.addedOrder.should.have.property('food');
        res.body.addedOrder.should.have.property('instruction');
        done();
      });
  });
});
});