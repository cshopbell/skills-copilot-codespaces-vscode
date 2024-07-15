//create web server
//create 2 routes
// 1. /comments
// 2. /comments/new
// 3. /comments/delete
// 4. /comments/edit
// 5. /comments/show

//1. /comments
//  - show all comments
//  - create a form to add a new comment
//2. /comments/new
//  - add a new comment
//  - redirect to /comments
//3. /comments/delete
//  - delete a comment
//  - redirect to /comments
//4. /comments/edit
//  - edit a comment
//  - redirect to /comments
//5. /comments/show
//  - show a single comment

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4:uuid} = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

let comments = [
    {
        id:uuid(),
        username:'Todd',
        comment:'lol that is so funny'
    },
    {
        id:uuid(),
        username:'Skyler',
        comment:'I like to go birdwatching with my dog'
    },
    {
        id:uuid(),
        username:'Sk8erBoi',
        comment:'Plz delete your account Todd'
    },
    {
        id:uuid(),
        username:'onlysayswoof',
        comment:'woof woof woof'
    }
]

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username,comment} = req.body;
    comments.push({username,comment,id:uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show',{comment});
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit',{