// create web server
// run: node comments.js
// open browser and type: http://localhost:3000/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var comments = [];
app.use(bodyParser.json());
app.get('/', function(req, res){
    res.json(comments);
});
app.post('/', function(req, res){
    comments.push(req.body);
    res.json(comments);
});
app.listen(3000);