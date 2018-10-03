import express from 'express';
// import Client from './config';
import {Client} from 'pg';
import verify from './verify';
import user from './userModel';

const router = express.Router();

const client = new Client({
  connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/fast-food-fast'
});
client.connect()
.then(() => console.log('connected'))
.catch(err => console.error('connection error', err.stack));

router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
   
   client.query('SELECT * FROM user_tbl WHERE username = $1', [username],(error, results) => {
        
        if (error) {
          res.json({"err": error});
        } 
          if (results.rows.length && results.rows[0].password == password) {
            user.username = username;
            user.password = password;
            user.admin = results.rows[0].admin;

            const token = verify.getToken(user);
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

       let username = req.body.username;
       let password = req.body.password;
   
    client.query('INSERT INTO user_tbl  (username,password) VALUES ($1,$2)', [username,password], (error) => {
        if (error) {
            res.json({
                "code": 400,
                "failed": 'Please check the credetials and try again'
            })
        } else {
            res.json({
                "code": 200,
                "success": "user registered successfully"
            });
        }
    });
});

export default router;