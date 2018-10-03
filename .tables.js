
// import client from './src/config';
import {Client} from 'pg';
const client = new Client();
// client.connect();
const sql = 'DROP TABLE IF EXISTS user_tbl CASCADE; CREATE TABLE IF NOT EXISTS user_tbl(id serial PRIMARY KEY,username text NOT NULL,password text NOT NULL);DROP TABLE IF EXISTS order_tbl; CREATE TABLE IF NOT EXISTS order_tbl(order_id serial NOT NULL,uid INTEGER REFERENCES user_tbl(id),address TEXT NOT NULL,instruction text,status TEXT,TEXT NOT NULL,food TEXT NOT NULL,createdat DATE,modifiedat DATE,PRIMARY KEY (order_id,uid));DROP TABLE IF EXISTS menu;CREATE TABLE IF NOT EXISTS menu(id serial PRIMARY KEY, food text NOT NULL);';
client.query(sql,(err)=>{
    if(err)
    console.log(err);

    console.log('table created')
});



   