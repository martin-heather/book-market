//express
const express = require('express');
const app = express();
//multer
const multer = require('multer');
const upload = multer({
  dest: __dirname + '/public/images',
});
//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//reload magic
const reloadMagic = require('./reload-magic.js');
reloadMagic(app);

//utilities
const generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

//global variables
const sessions = {};
const passwords = {};
const users = {};
const inventory = {};

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line

app.get('/session', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    const username = sessions[sessionId];
    return res.send(JSON.stringify({ success: true, username }));
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/signup', upload.none(), (req, res) => {
  console.log('**** Signup endpoint');
  console.log('this is the body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username]) {
    return res.send({
      success: false,
      message: 'Signup failed: Username already taken.',
    });
  }
  passwords[username] = enteredPassword;
  console.log('passwords object', passwords);
  const sessionId = generateId();
  console.log('generated id', sessionId);
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true }));
});

app.post('/login', upload.none(), (req, res) => {
  console.log('**** Login endpoint');
  console.log('this is the parsed body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  console.log('expected password', expectedPassword);
  if (enteredPassword === expectedPassword) {
    console.log('password matches');
    const sessionId = generateId();
    console.log('generated id', sessionId);
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
