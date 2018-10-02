'use strict';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../build/src/app');
let Client = require('pg').Client;

let should = chai.should();


chai.use(chaiHttp);

let client = new Client();

//Our parent block
describe('Order', () => {
  beforeEach('drops database',() => { 

    client.query('DROP DATABASE fast-food-fast',function(err){
      if(err){
        console.log(err);
        return;
      }
    });
  });
      it('create database',()=>{
        client.query('CREATE DATABASE fast-food-fast',function(err){
          if(err){
            console.log(err);
            console.log('failed creating db');
            return;
          }
        });
      });

      it('create user table user_tbl',()=>{
        client.query('CREATE TABLE user_tbl',function(err){
          if(err){
            console.log(err);
            console.log('failed creating table user_tbl');
            return;
          }
        });
      });
      it('create user table menu',()=>{
        client.query('CREATE TABLE user_tbl',function(err){
          if(err){
            console.log(err);
            console.log('failed creating table menu');
            return;
          }
        });
      });
      it('create user table order_tbl',()=>{
        client.query('CREATE TABLE user_tbl',function(err){
          if(err){
            console.log(err);
            console.log('failed creating table menu order_tbl');
            return;
          }
        });
      });
    });

    // done();
  // });

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
// });