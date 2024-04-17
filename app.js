const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/contactDance');
const bodyparser = require('body-parser');
const port = 8000;
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var contact = mongoose.model('contact',contactschema);
app.use('/static',express.static('static'));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    const sids = {};
    res.status(200).render('home.pug',sids);
});
app.get('/contact',(req,res)=>{
    const sids = {};
    res.status(200).render('contact.pug',sids);
});
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.")
    }) 
    // res.status(200).render('contact.pug');
});

app.listen(port,()=>{
    console.log(`The application started successfully on the ${port}`)
}); 