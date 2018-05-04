const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");


app.get('/', function (req, res) {
  res.send('Hello World!');
});

//####################################inapp####################################
app.get('/email',function(req,res){
    db.collection('email').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})

app.post('/email',function(req,res){
        var txt={ email:req.body.email,     
        };
    db.collection('email').insert(txt,function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    res.send(txt);
    })
})






MongoClient.connect("mongodb://localhost:27017/parsemail",function(err,database){
    if(err){
        return console.log(err);
    }
    db=database;
    app.listen(3003);
    
})