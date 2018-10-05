import express from 'express';
import  verify  from './verify';
// import Client from './config';
import {Client} from 'pg';


const router = express.Router();
const client = new Client({
    connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/fast-food-fast'
    // connectionString:'postgres://victor:akubudike1!@localhost/fast-food-fast'
  });
client.connect()  
.then(() => console.log('connected'))
.catch(err => console.error('connection error', err.stack));

router.get('/',(req,res)=>{
  
   client.query('SELECT * FROM menu', (error,results)=>{
        if (error) {
            res.json({
                "code": 400,
                "failed": 'The order Table was not Generated'
            })
        } else {
            res.json({
                "code": 200,
                "success": 'Fetched the list all the food in the menu',
                "table": results.rows
            });
        }
    });
});


router.route('/')
.post(verify.verifyAdmin,(req,res)=>{
 let food = req.body.food;
 let description = req.body.description;
 let price = +req.body.price;
 let pic_url = req.body.pic_url;


 client.query('INSERT INTO menu (food,description,price,pic_url) VALUES ($1,$2,$3,$4)',[food,description,price,pic_url],(error)=>{
    if (error) {
        res.json({
            "code": 400,
            "failed": error.detail
        })
    } else {
        res.json({
            "code": 200,
            "success": "the food has been added to the menu table"
        });
    }
});
});

export default router;