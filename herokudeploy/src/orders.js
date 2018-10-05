import express from 'express';
import  verify  from './verify';
// import Client from './config';
import {Client} from 'pg';

const router = express.Router();

const client = new Client({
    connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/fast-food-fast'
    // connectionString: 'postgres://victor:akubudike1!@localhost/fast-food-fast'
  });
client.connect()
.then(() => console.log('connected'))
.catch(err => console.error('connection error', err.stack));

router.route('/')
.get(verify.verifyAdmin,(req,res)=>{
    client.query(' SELECT user_tbl.id,order_tbl.order_id, username , address,instruction,status,phone,food,createdate,modifiedate FROM user_tbl INNER JOIN order_tbl ON uid = user_tbl.id',(error,results)=>{
        
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
    });
});

router.route('/:id')
.get(verify.verifyAdmin,(req,res)=>{
let id = +req.params.id;

client.query('SELECT * FROM order_tbl WHERE order_id = $1', [id],(error,results)=>{
    if (error) {
        res.json({
            "code": 400,
            "failed": `The order Table was not Generated, ${id} must be an interger`
        })
    } else {
        let successMessage = results.rows.length ? `The order related to the id ${id} was fetched` : `There is no order related to the provided id ${id}`;
        res.json({
            "code": 200,
            "success": successMessage,
            "table": results.rows
        });
    }
});
});

router.route('/:id')
.put(verify.verifyAdmin,(req,res)=>{
let orderId = +req.params.id;
let status = req.body.status;
let statusPattern = /(completed|new|processing|cancelled)/i;

if(statusPattern.test(status))
status = req.body.status;

client.query('UPDATE order_tbl SET (status,modifiedate) = ($1,current_timestamp) WHERE order_id = $2',[status,orderId],(error)=>{
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
});
});

router.post('/',(req,res)=>{
    let phone;
    let uid= +req.body.uid;
    let address = req.body.address;
    let instruction = req.body.instruction;
    let Originalfood = req.body.food;

    let phonePattern = /[0-9]{11}/;
    if(phonePattern.test(req.body.phone) && req.body.phone.length === 11){
    phone = req.body.phone;
    }

   

    let food = Originalfood.map(function(value){
        return value + "";
    });
    client.query('INSERT INTO order_tbl (uid,address,instruction,phone,food,createdate,modifiedate) VALUES ($1,$2,$3,$4,ARRAY [$5],current_timestamp,current_timestamp)',[uid,address,instruction,phone,food],(error,results)=>{

        
        if (error) {
            res.json({
                "code": 400,
                "failed": error.detail
            })
        } else {
            let addedOrder = {uid,address,instruction,phone,food}
            res.json({
                "code": 200,
                "message": "Your order has been placed!",
                addedOrder
            });
        }
    });
});


export default router;