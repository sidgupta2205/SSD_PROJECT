const port = 3000
const express = require('express')
const { exec } = require('child_process');
const cors = require('cors')
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var fs = require('fs');
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
let flag=0

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

var issue2options = {
    origin: true,
    methods: ['POST'],
    credentials: true,
    maxAge: 3600
};
let dbo;
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    dbo = db.db("mydb");
    var myobj = JSON.parse(fs.readFileSync('./conf_ACM.json', 'utf8'));
    myobj.map((obj) => {
        dbo.collection("customers").updateOne(obj,{ $set: obj},{upsert:true});
    })
});












app.listen(port, function(err) {
    if (err) {
        console.log(err)

    }
    console.log('server is running on port: ', port)
})