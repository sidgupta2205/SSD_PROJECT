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

app.get('/search', cors(issue2options), function(req, res) {
    var q = req.query.q;
    const myArray = q.split(" ");
    var s = ""
    for(var i=0;i<myArray.length-1;i++)
    {
        s=s+myArray[i]+"|"
    }
    console.log(s)
    s=s+myArray[myArray.length-1]
    var query = {'title': {'$regex' : s, '$options' : 'i'}};
    console.log(query);
    dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(typeof(result))
        if (result.length == 0) {
            console.log("object empty")
            exec('python ..\\..\\script.py', function (error, stdout, stderr) {
                console.log(error);



                console.log(stdout);
                console.log(stderr);
                dbo.collection("customers").find(query).toArray(function(error,result2){
                
                    if (err) throw err;
                    res.send(result2);
                });
                
                //fetch again
                
            });
        } else {
            res.send(result);
        }
    });
});





app.listen(port, function(err) {
    if (err) {
        console.log(err)

    }
    console.log('server is running on port: ', port)
})
