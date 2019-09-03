//express
const express = require('express');
const app = require('express')();
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
const itemsInCart = [];
const cartTotal = 0;
const itemsInWishList = [];
const data = require('./data.js');
const inventory = data.inventory;
const userProfiles = data.userProfiles;

//Data Classes

class Item {
  constructor(
    id,
    title,
    author,
    desc,
    categories,
    language,
    imagePath,
    price,
    seller
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.desc = desc;
    this.categories = categories;
    this.language = language;
    this.imagePath = imagePath;
    this.price = price;
    this.seller = seller;
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

app.set('view engine', 'pug');
app.use(require('body-parser').urlencoded({ extended: false }));

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Signing in and out
app.get('/session', (req, res) => {
  console.log('session req: ', req.cookies);
  const sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    const username = sessions[sessionId];
    return res.send(JSON.stringify({ success: true, username }));
  }
  res.send(JSON.stringify({ success: false }));
});

app.get('/userprofiles', (req, res) => {
  console.log('Sending back the userProfiles');
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, userProfiles }));
});

app.post('/signup', upload.none(), (req, res) => {
  console.log('**** Signup endpoint');
  console.log('this is the body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const filteredUsers = userProfiles.filter(user => user.name === username);
  if (filteredUsers.length !== 0) {
    return res.send({
      success: false,
      message: 'Signup failed: Username already taken.',
    });
  }
  const newUserProfile = new UserProfile(username, enteredPassword, [], [], []);
  userProfiles.push(newUserProfile);
  console.log('userProfiles: ', userProfiles);
  const sessionId = generateId();
  console.log('generated id', sessionId);
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true, userProfiles: userProfiles }));
});

app.post('/login', upload.none(), (req, res) => {
  console.log('**** Login endpoint');
  console.log('this is the parsed body', req.body);
  console.log('inventory: ', inventory);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const filteredUsers = userProfiles.filter(user => user.name === username);
  console.log(filteredUsers);
  const expectedPassword = filteredUsers[0] ? filteredUsers[0].password : null;
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
  itemsInCart.length = 0;
  itemsInWishList.length = 0;
  CartTotal = 0;
  res.send(JSON.stringify({ success: true }));
});

// Managing inventory

app.get('/inventory', (req, res) => {
  console.log('Sending back the inventory');
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, inventory }));
});

app.get('/item/:', (req, res) => {
  console.log('Sending back the item detail');
  console.log(req.body);
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, inventory }));
});

app.post('/additem', upload.single('image'), (req, res) => {
  console.log('*** new item');
  console.log('POST new item body', req.body);
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  console.log('username', username);
  const id = Math.floor(Math.random() * 100000000);
  const title = req.body.title;
  const author = req.body.author;
  const language = req.body.language;
  const categories = req.body.categories;
  const price = req.body.price;
  const desc = req.body.desc;
  const seller = username;
  const imagePath = req.file ? `/images/${req.file.filename}` : '';
  const newItem = new Item(
    id,
    title,
    author,
    desc,
    categories,
    language,
    imagePath,
    price,
    seller
  );
  console.log('new item', newItem);
  inventory.push(newItem);
  console.log('inventory: ', inventory);
  res.send(JSON.stringify({ success: true, newInventory: inventory }));
});

//Wish List

app.get('/API-wishlist', (req, res) => {
  console.log('Sending back the items in Wish List', req.headers);
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, itemsInWishList }));
});

app.post('/addtolist', upload.none(), (req, res) => {
  console.log('*** item added to Wish List');
  console.log('POST new list body', req.body);
  const bookId = req.body.itemsInList;
  itemsInWishList.push(bookId);
  console.log('itemsInWishList: ', itemsInWishList);
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, itemsInWishList }));
});

//Shopping Cart & Checkout

app.get('/API-shoppingcart', (req, res) => {
  console.log('Sending back the items in Cart'); //, req.headers
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, itemsInCart, cartTotal }));
});

app.post('/addtocart', upload.none(), (req, res) => {
  console.log('*** item added to cart');
  console.log('POST new item body', req.body);
  const bookId = req.body.itemsInCart;
  itemsInCart.push(bookId);
  console.log('itemsInCart: ', itemsInCart);
  const sessionId = req.cookies.sid;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, itemsInCart }));
});

app.post('/clearcart', upload.none(), (req, res) => {
  console.log('*** item added to cart');
  console.log('POST new item body', req.body);
  itemsInCart.length = 0;
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({ success: false, message: 'Invalid session' })
    );
  }
  res.send(JSON.stringify({ success: true, itemsInCart }));
});

app.post('/save-stripe-token', upload.none(), (req, res) => {
  console.log('req.body: ', req.body);
  let token = req.body.stripeToken;
  let amount = req.body.amount;
  stripe.charges.create({
    amount: amount,
    currency: 'CAD',
    description: '',
    source: token,
  });
  itemsInCart.length = 0;
});

//*

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
