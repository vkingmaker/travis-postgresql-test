import express from 'express';
// import Client from './config';
import {Client} from 'pg';
import verify from './verify';
// import { runInNewContext } from 'vm';

const router = express.Router();

const client = new Client({
  connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/fast-food-fast'
  // connectionString:'postgres://victor:akubudike1!@localhost/fast-food-fast'
});
client.connect()
.then(() => console.log('connected'))
.catch(err => console.error('connection error', err.stack));


router.post("/login", function (req, res) {

  let username = req.body.username;
  let password = req.body.password;
   
   client.query('SELECT * FROM user_tbl WHERE username = $1', [username],(error, results) => {
        
        if (error) {
          res.json({"err": error});
        } 
          if (results.rows.length && results.rows[0].password === password) {

            const token = verify.getToken({username,"admin": results.rows[0].admin });
            res.send({
              "success": "Login successful",
              "token" : token
            });

          } else {
            res.send({
              "success": "You must be a Registered user"
            });
          }
      });
  });


router.post("/signup",(req, res) => {

  let userPattern = /[A-Za-z0-9]{6,}/;
  let passPattern =  /.{6,}/;
  let username;
  let password;

 
if(userPattern.test(req.body.username) && passPattern.test(req.body.password)){
  username = req.body.username;
  password = req.body.password;
    client.query('INSERT INTO user_tbl  (username,password) VALUES ($1,$2)', [username,password], (error) => {
        if (error) {
            res.json({
                "code": 400,
                "failed": error.detail
            })
        } else {
          const token = verify.getToken({username});
            res.json({
                "code": 201,
                "success": "user registered successfully",
                "token":token
            });
        }
    });
  }else{
    res.status(400).end("Your username and password should be at least 6 characters");
  }
});

export default router;