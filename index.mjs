import express from "express";
import mongoose from "mongoose";
import Data from './Card.mjs'
import cors from 'cors'
const app = express()

const connection =
    'mongodb+srv://akshay:bdbxSEIZu77h2F1u@cluster0.t5ehg.mongodb.net/Tinder?retryWrites=true&w=majority';
mongoose
    .connect(connection, { useNewUrlParser: true })
    .then(() => {
        console.log('succesfully connected to the database');
    })
    .catch((err) => {
        console.log(`errror occured ${err}`);
    });
app.use(cors())
app.get('/', (req, res) => {
    Data.find({ 'name': 'ajay' }, 'name sirname', (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
            res.status(200).send(data)
        }
    })
    //res.status(200).send('home page')
})

app.get('/find', (req, res) => {

    const user=req.query.name;
    const limit=req.query.limit;
    console.log(limit)
    const query = Data.find({'name':`${user}`})
    query.select('name sirname');
    query.limit(limit);
    query.exec((err,data)=>{
        if(err){
            console.log(err)
            res.send('errror....')
            
        }
        else{
            //console.log(data);
            res.send(data)
         
        }
    })
})

// app,get('./find',(req.res)=>{


// })
app.get('/setData', (req, res) => {

    const name=req.query.name
    const sirname=req.query.sirname
    const Idata = { 'name': `${name}`, 'sirname': `${sirname}` }
    Data.create(Idata, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {

            res.send({status:"ok",data})
        }
    })

})

app.listen(3000, () => { console.log('app is succesfully listening..') })