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

app.get('/search', cors(issue2options), function(req, res) {
    var q = req.query.q;
    const myArray = q.split(" ");
    myArr = q.split(" ");
    console.log(myArray)
    console.log(myArray.length)
    flag = 0
    

     // break into string 
    //save in array with no duplicates
    var i;
    for(i=0;i<myArray.length-1;i++)
    {
        console.log(myArray[i])
        var query = {'title': {'$regex' : myArray[i], '$options' : 'i'}};
        dbo.collection("customers").find(query).toArray(function(err, result,flag) {
            
            
            if(result.length>0 && !res.headersSent)
            {
            res.send(result)

            console.log(i+" Here1")
            console.log(res.headersSent);
            return
            
            }
            
    
        });
        console.log(i+" Here2")
        console.log(res.headersSent)
        
    }

    var waitTill = new Date(new Date().getTime() + 1 * 9000);
    while(waitTill > new Date()){}
        console.log("value of i" + i)
        if(i==myArray.length-1)
        {
            console.log("Here3")
        console.log(res.headersSent)
        }
         
        if(res.headersSent)
        {
            console.log("object empty")
            exec('python ..\\..\\scrwqipt.py', function (error, stdout, stderr) {
            console.log(error);
            console.log(stdout);
            console.log(stderr);
            var query = {'title': {'$regex' : q, '$options' : 'i'}};
            dbo.collection("customers").find(query).toArray(function(error,result2){
            
                if (error) throw error;
                res.send(result2);
            });
            
            //fetch again
            
            });

        }

        //data not found in database
        
        
    

});











app.listen(port, function(err) {
    if (err) {
        console.log(err)

    }
    console.log('server is running on port: ', port)
})
