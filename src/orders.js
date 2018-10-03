import express from 'express';
import  verify  from './verify';
// import Client from './config';
import {Client} from 'pg';

const router = express.Router();

const client = new Client({
    connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/fast-food-fast'
  });
client.connect()
.then(() => console.log('connected'))
.catch(err => console.error('connection error', err.stack));

router.route('/')
.get(verify.verifyAdmin,(req,res,next)=>{
    client.query(' SELECT user_tbl.id,order_tbl.order_id, username , address,instruction,status,phone,food,createdat,modifiedat FROM user_tbl INNER JOIN order_tbl ON uid = user_tbl.id',(error,results)=>{
        
        if (error) {
            res.json({
                "code": 400,
                "failed": 'The order Table was not Generated'
            })
        } else {
            res.json({
                "code": 200,
                "success": "The order Table was Generated",
                "table": results.rows
            });
        }
        // client.end();
    });
});

router.route('/:id')
.get(verify.verifyAdmin,(req,res,next)=>{
const id = +req.params.id;

client.query('SELECT * FROM order_tbl WHERE order_id = $1', [id],(error,results)=>{
    if (error) {
        res.json({
            "code": 400,
            "failed": 'The order Table was not Generated'
        })
    } else {
        res.json({
            "code": 200,
            "success": `The order related to the id ${id} was fetched`,
            "table": results.rows
        });
    }
    // client.end();
});
});

router.route('/:id')
.put(verify.verifyAdmin,(req,res,next)=>{
let orderId = +req.params.id;
let status = req.body.status;
client.query('UPDATE order_tbl SET status = $1 WHERE order_id = $2',[status,orderId],(error)=>{
    if (error) {
        res.json({
            "code": 400,
            "failed": error
        })
    } else {
        res.json({
            "code": 200,
            "success": "Order Status has been updated"
        });
    }
    // client.end();
});
});

router.post('/',(req,res)=>{
    client.connect();
    let uid= +req.body.uid;
    let address = req.body.address;
    let instruction = req.body.instruction;
    let phone = req.body.phone;
    let food = req.body.food;
    let today = new Date();
    

    client.query('INSERT INTO order_tbl (uid,address,instruction,phone,food,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7)',[uid,address,instruction,phone,food,today,today],(error,results)=>{
        if (error) {
            res.json({
                "code": 400,
                "failed": error
            })
        } else {
            let addedOrder = {uid,address,instruction,phone,food,today}
            res.json({
                "code": 200,
                "message": "Your order has been placed!",
                addedOrder
            });
        }
        // client.end();
    });
});


export default router;