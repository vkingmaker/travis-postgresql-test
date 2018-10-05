import express from 'express';
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

router.get('/:id/orders',(req,res)=>{
let id;

let idPattern = /[0-9]+/;
if(idPattern.test(req.body.id)){
    id = req.body.id;
}

client.query('SELECT * FROM order_tbl WHERE uid = $1', [id],(error,results)=>{
    if(results.rows[0] === void 0){
        res.json({
            "code":200,
            "failed":"The user has not place any order Yet"
        });
    }
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
});
});

export default router;