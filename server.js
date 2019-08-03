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
const userProfiles = [
  {
    name: 'Heather Martin',
    password: '',
    itemsInWishList: [2],
    itemsForSale: [1, 3],
    itemsInCart : [],
  },
  {
    name: 'Hsiu-Jin Chan',
    password: '67891',
    itemsInWishList: [1],
    itemsForSale: [3],
    itemsInCart : [],
  },
];


//Data Classes

class Item {
  constructor(id, title, author, desc, category, language, imagePath, price) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.desc = desc;
    this.category = category;
    this.language = language;
    this.imagePath = imagePath;
    this.price = price;
    this.timeAdded = Date.now();
  }
}

class UserProfile {
  constructor(name, password, itemsInWishList, itemsForSale, itemsInCart) {
    this.name = name;
    this.password = password;
    this.itemsInWishList = itemsInWishList;
    this.itemsForSale = itemsForSale;
    this.itemsInCart = itemsInCart;
  }
}

//_______________________________________________________

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line

// Signing in and out
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
  const filteredUsers = userProfiles.filter(user => user.name === username);
  console.log('filteredUsers: ', filteredUsers);
  if (filteredUsers.length !== 0) {
    return res.send({
      success: false,
      message: 'Signup failed: Username already taken.',
    });
  }
  const newUserProfile = new UserProfile(username, enteredPassword, [], [], []);
  console.log('newUserProfile: ', newUserProfile);
  userProfiles.push(newUserProfile);
  console.log('userProfiles: ', userProfiles);
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
  const filteredUsers = userProfiles.filter(user => user.name === username);
  console.log(filteredUsers);
  const expectedPassword = filteredUsers[0].password;
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

// Displaying inventory

app.get('/inventory', (req, res) => {
  console.log('Sending back the inventory');
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  res.send(JSON.stringify({ success: true, inventory }));
});

app.get('/item/:', (req, res) => {
  console.log('Sending back the item detail');
  console.log(req.body);
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  res.send(JSON.stringify({ success: true, inventory }));
});

// Adding inventory

app.post('/inventory', upload.none(), (req, res) => {
  console.log('POST inventory body', req.body);
  const sessionId = req.cookies.sid;
  const newItem = new Item(sessions[sessionId], req.body.inventory);
  inventory.push(newItem);
  res.send(JSON.stringify({ success: true, inventory }));
});

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
