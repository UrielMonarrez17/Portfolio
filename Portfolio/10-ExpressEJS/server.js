const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const https = require("https");
 
// TODO: configure the express server
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;
const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let user;

app.post('/login', (req, res) => {
  const name = req.body.name;
  user =  name ;
  res.render('test', { user, securityLevel: "POST" });
});

app.post('/post', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  if (!user) return res.redirect('/');
  res.render('home', { user, posts });
});

app.get('/home:user', (req, res) => {
  if (!user) return res.redirect('/');
  res.render('home', { user, posts });
});

app.get('/post/:index', (req, res) => {
  const post = posts[req.params.index];
  if (post) {
      res.render('post', { post, index: req.params.index });
  } else {
      res.redirect('/home');
  }
});

app.post('/post/:index/edit', (req, res) => {
  posts[req.params.index].content = req.body.content;
  res.redirect(`/post/${req.params.index}`);
});

app.post('/post/:index/delete', (req, res) => {
  posts.splice(req.params.index, 1);
  res.redirect('/home');
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
