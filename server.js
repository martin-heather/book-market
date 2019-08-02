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
const inventory = [
  {
    id: 1,
    title: 'XXXXXX: A Brief History of Humankind',
    author: 'Harari, Yuval Noah',
    desc:
      '100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws; and to be enslaved by bureaucracy, timetables and consumerism? And what will our world be like in the millennia to come? ',
    category: 'history',
    language: 'English',
    imagePath: './images/sapiens.jpg',
    price: 23.99,
    timeAdded: 1564529906987,
  },
  {
    id: 2,
    title: "L'ironie de l'évolution",
    author: 'Durand, Thomas C.',
    desc:
      "La théorie de l'évolution met en jeu un stimulant paradoxe : c'est justement l'évolution (de notre cerveau) qui explique les résistances à cette idée. Ainsi, les difficultés que nous éprouvons à \"croire\" la théorie darwinienne de l'évolution s'expliquent elles-mêmes par ladite théorie, et en constituent finalement une éclatante illustration.",
    category: 'science',
    language: 'French',
    imagePath: './images/ironie.jpg',
    price: 17.99,
    timeAdded: 1564529938516,
  },
  {
    id: 3,
    title: 'Dreadnought',
    author: 'Daniels, April',
    desc: 'Danny Tozer has a problem: she just inherited the powers of Dreadnought, the world’s greatest superhero.  Until Dreadnought fell out of the sky and died right in front of her, Danny was trying to keep people from finding out she’s transgender. But before he expired, Dreadnought passed his mantle to her, and those secondhand superpowers transformed Danny’s body into what she’s always thought it should be. Now there’s no hiding that she’s a girl. It should be the happiest time of her life, but Danny’s first weeks finally living in a body that fits her are more difficult and complicated than she could have imagined. Between her father’s dangerous obsession with “curing” her girlhood, her best friend suddenly acting like he’s entitled to date her, and her fellow superheroes arguing over her place in their ranks, Danny feels like she’s in over her head.  She doesn’t have much time to adjust. Dreadnought’s murderer—a cyborg named Utopia—still haunts the streets of New Port City, threatening destruction. If Danny can’t sort through the confusion of coming out, master her powers, and stop Utopia in time, humanity faces extinction.',
    category: 'young adult',
    language: 'English',
    imagePath: './images/dreadnought.jpg',
    price: 10.99,
    timeAdded: 1564529965305,
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
