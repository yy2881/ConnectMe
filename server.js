//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

//create connection to mysql
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '123456',
  database : 'my_db'
});

//Connect
db.connect(function(err){
  if(err) {
    throw err;
  }
  console.log('mysql connected');
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.get('/database', function(req, res){
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql,(err,result) => {
    if(err) throw err;
    //console.log(result);
    res.send(result);
  })

});

app.post('/',function(req,res) {
  res.send('submited succesfully');
});

app.listen(3000, function(){
  console.log("Example app listening on port 3000");
});
