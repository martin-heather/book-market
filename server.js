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
const userProfiles = [];
const itemsInCart = [];
const cartTotal = 0;
const itemsInWishList = [];
const inventory = [
  {
    id: 1,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Harari, Yuval Noah',
    desc:
      '100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws; and to be enslaved by bureaucracy, timetables and consumerism? And what will our world be like in the millennia to come? ',
    categories: ['history', 'science', 'anthropology', 'philosophy'],
    language: 'English',
    imagePath: '/images/sapiens.jpg',
    price: 23.99,
    timeAdded: 1564529906987,
    seller: 'Heather Martin',
  },
  {
    id: 2,
    title: "L'ironie de l'évolution",
    author: 'Durand, Thomas C.',
    desc:
      "La théorie de l'évolution met en jeu un stimulant paradoxe : c'est justement l'évolution (de notre cerveau) qui explique les résistances à cette idée. Ainsi, les difficultés que nous éprouvons à \"croire\" la théorie darwinienne de l'évolution s'expliquent elles-mêmes par ladite théorie, et en constituent finalement une éclatante illustration.",
    categories: ['science'],
    language: 'French',
    imagePath: '/images/ironie.jpg',
    price: 16.99,
    timeAdded: 1564529938516,
    seller: 'Hsiu-Jin Chan',
  },
  {
    id: 3,
    title: 'Dreadnought',
    author: 'Daniels, April',
    desc:
      'Danny Tozer has a problem: she just inherited the powers of Dreadnought, the world’s greatest superhero.  Until Dreadnought fell out of the sky and died right in front of her, Danny was trying to keep people from finding out she’s transgender. But before he expired, Dreadnought passed his mantle to her, and those secondhand superpowers transformed Danny’s body into what she’s always thought it should be. Now there’s no hiding that she’s a girl. It should be the happiest time of her life, but Danny’s first weeks finally living in a body that fits her are more difficult and complicated than she could have imagined. Between her father’s dangerous obsession with “curing” her girlhood, her best friend suddenly acting like he’s entitled to date her, and her fellow superheroes arguing over her place in their ranks, Danny feels like she’s in over her head.  She doesn’t have much time to adjust. Dreadnought’s murderer—a cyborg named Utopia—still haunts the streets of New Port City, threatening destruction. If Danny can’t sort through the confusion of coming out, master her powers, and stop Utopia in time, humanity faces extinction.',
    categories: ['young adult', 'gender', 'fiction', 'science fiction'],
    language: 'English',
    imagePath: '/images/dreadnought.jpg',
    price: 12.99,
    timeAdded: 1564529965305,
    seller: 'Samer Ahmed',
  },
  {
    id: 4,
    title: "L'avalée des avalés",
    author: 'Ducharme, Réjean',
    desc:
      'Tout m’avale (…) Je suis avalée par le fleuve trop grand, par le ciel trop haut, par les fleurs trop fragiles, par les papillons trop craintifs, par le visage trop beau de ma mère.” L’Avalée des avalés, premier roman de Réjean Ducharme, s’ouvre sur ces mots crus, douloureux, vibrants, ces paroles d’écorchée vive qui immédiatement nous happent. “Tout m’avale”, scande la narratrice, et nous voilà, nous aussi, immédiatement “avalés”, pris à la gorge par la douleur vive de cette héroïne qui s’agrippe de toutes ses griffes à l’enfance, alors même que son corps est en train de la trahir.',
    categories: ['fiction'],
    language: 'French',
    imagePath: '/images/avalee.jpg',
    price: 7.99,
    timeAdded: 1564676760422,
    seller: 'Christie Kotsopoulos',
  },
  {
    id: 5,
    title: 'En as-tu vraiment besoin ?',
    author: 'McSween, Pierre-Yves',
    desc:
      'Dans cet ouvrage capital où le chroniqueur affaires et économie de Paul Arcand passe dans son tordeur une quarantaine de sujets avec perspicacité et humour, cette question toute simple invite à revoir toutes les décisions qui ont un effet direct sur notre compte de banque. Au Québec, l’analphabétisme financier et la consommation à outrance influent négativement sur l’existence de chacun. Pour aider à voir les choses d’un œil neuf, En as-tu vraiment besoin? place un miroir réaliste devant nos choix de vie et leurs conséquences. L’auteur y remet en question notre façon de dépenser et insiste sur la nécessité de se construire une marge de manœuvre financière.',
    categories: ['economics', 'finance', 'sociology', 'nonfiction'],
    language: 'French',
    imagePath: '/images/besoin.jpg',
    price: 24.99,
    timeAdded: 1564676760445,
    seller: 'Daniel Robineau',
  },
  {
    id: 6,
    title: 'The Paper Menagerie and Other Stories',
    author: 'Liu, Ken',
    desc:
      'A publishing event: Bestselling author Ken Liu selects his award-winning science fiction and fantasy tales for a groundbreaking collection—including a brand-new piece exclusive to this volume. A must-have for every science fiction and fantasy fan, this beautiful book is an anthology to savor.',
    categories: ['short stories', 'science fiction', 'fiction'],
    language: 'English',
    imagePath: '/images/menagerie.jpg',
    price: 26.99,
    timeAdded: 1564676760512,
    seller: 'Heather Martin',
  },
  {
    id: 7,
    title: 'Midnight Robber',
    author: 'Hopkinson, Nalo',
    desc:
      'It\'s Carnival time, and the Carribean-colonized planet of Toussaint is celebrating with music, dance and pageantry. Masked "Midnight Robbers" waylay revelers with brandished weapons and spellbinding words. But to young Tan-Tan, the Robber Queen is simply a favourite costume to wear at the festival--until her power-corrupted father commits an unforgivable crime.',
    categories: ['science fiction', 'fiction'],
    language: 'English',
    imagePath: '/images/robber.jpg',
    price: 14.99,
    timeAdded: 1564676760523,
    seller: 'Hsiu-Jin Chan',
  },
  {
    id: 8,
    title: 'Hiver nucléaire',
    author: 'Cab',
    desc:
      "Montréal, juin 2028, -30°C. C'est l'hiver nucléaire depuis un terrible accident à la nouvelle centrale nucléaire Gentilly-3, à Pointe-aux Trembles. La neige atteint les balcons des 2e étages, les déplacements se font en motoneige, les souffleuses tournent à plein régime, et des quartiers entier sont désertés. Au milieu de cette interminable saison froide, Flavie, courrier en ski-doo, doit composer avec les éléments, les retombées radioactives et une faune urbaine, en pleine mutation... littéralement. Une livraison chez le couple le plus «cool» de Montréal la fera sortir de sa zone de confort et la propulsera au milieu d'une quête vers le parfait bagel du Mile-End.",
    categories: ['comic books', 'fiction', 'science fiction'],
    language: 'French',
    imagePath: '/images/hiver.jpg',
    price: 9.99,
    timeAdded: 1564676760534,
    seller: 'Samer Ahmed',
  },
  {
    id: 9,
    title: 'Bone & Bread',
    author: 'Nawaz, Saleema',
    desc:
      'Beena and Sadhana are sisters who share a bond that could only have been shaped by the most unusual of childhoods -- and by shared tragedy. Orphaned as teenagers, they have grown up under the exasperated watch of their Sikh uncle, who runs a bagel shop in Montreal\'s Hasidic community of Mile End. Together, they try to make sense of the rich, confusing brew of values, rituals, and beliefs that form their inheritance. Yet as they grow towards adulthood, their paths begin to diverge. Beena catches the attention of one of the "bagel boys" and finds herself pregnant at sixteen, while Sadhana drives herself to perfectionism and anorexia.',
    categories: ['fiction'],
    language: 'English',
    imagePath: '/images/bread.jpg',
    price: 18.99,
    timeAdded: 1564676760545,
    seller: 'Christie Kotsopoulos',
  },
  {
    id: 10,
    title: 'Delusions of Gender',
    author: 'Fine, Cordelia',
    desc:
      'Drawing on the latest research in neuroscience and psychology, Cordelia Fine debunks the myth of hardwired differences between men’s and women’s brains, unraveling the evidence behind such claims as men’s brains aren’t wired for empathy, and women’s brains aren’t made to fix cars. She then goes one step further, offering a very different explanation of the dissimilarities between men’s and women’s behavior. Instead of a “male brain” and a “female brain,” Fine gives us a glimpse of plastic, mutable minds that are continuously influenced by cultural assumptions about gender.',
    categories: [
      'feminism',
      'gender',
      'science',
      'psychology',
      'sociology',
      'nonfiction',
    ],
    language: 'English',
    imagePath: '/images/gender.jpg',
    price: 22.99,
    timeAdded: 1564676760556,
    seller: 'Daniel Robineau',
  },
  {
    id: 11,
    title: "L'impureté",
    author: 'Tremblay, Larry',
    desc:
      'La romancière à succès Alice Livingston est morte. Elle laisse derrière elle des lecteurs éplorés, un manuscrit inédit, un fils qui cherche à refaire sa vie le plus loin possible de son père, et son mari Antoine, incapable de pleurer sa mort et qui n’a jamais apprécié son œuvre. Pourtant, le roman posthume de sa femme va le bouleverser et le contraindre à faire face à ses souvenirs. Et inévitablement à ses démons enfouis. Car la fiction parfois tisse entre les lignes une toile vengeresse.',
    categories: ['fiction'],
    language: 'French',
    imagePath: '/images/impurete.jpg',
    price: 13.99,
    timeAdded: 1564676760567,
    seller: 'Heather Martin',
  },
  {
    id: 12,
    title: 'Les Aurores montréales',
    author: 'Proulx, Monique',
    desc:
      "À la fois émouvante réflexion sur l'identité et fine satire de nos mœurs locales, ces nouvelles sont écrites avec une efficacité redoutable. Si parfois vous doutez que Montréal ait une âme, la lecture des Aurores montréales vous rassurera.",
    categories: ['short stories', 'fiction'],
    language: 'French',
    imagePath: '/images/aurores.jpg',
    price: 15.99,
    timeAdded: 1564676760569,
    seller: 'Hsiu-Jin Chan',
  },
  {
    id: 13,
    title: 'The Riddle of the Labyrinth',
    author: 'Fox, Margalit',
    desc:
      "In the tradition of Simon Winchester and Dava Sobel, The Riddle of the Labyrinth tells one of the most intriguing stories in the history of language, masterfully blending history, linguistics, and cryptology with an elegantly wrought narrative. For half a century after famed archaeologist Arthur Evans discovered a cache of ancient tablets, Europe's earliest written records, the meaning of the inscriptions, and even the language in which they were written, would remain a mystery. Award-winning New York Times journalist Margalit Fox's riveting real-life intellectual detective story travels from the Bronze Age Aegean--the era of Odysseus, Agamemnon, and Helen--to the turn of the 20th century and the work of charismatic English archeologist Arthur Evans, to the colorful personal stories of the decipherers. These include Michael Ventris, the brilliant amateur who deciphered the script but met with a sudden, mysterious death that may have been a direct consequence of the decipherment; and Alice Kober, the unsung heroine of the story whose painstaking work allowed Ventris to crack the code.",
    categories: [
      'nonfiction',
      'languages',
      'linguistics',
      'archaeology',
      'history',
      'science',
    ],
    language: 'English',
    imagePath: '/images/riddle.jpg',
    price: 17.99,
    timeAdded: 1564676760578,
    seller: 'Samer Ahmed',
  },
  {
    id: 14,
    title: 'Ru',
    author: 'Thúy, Kim',
    desc:
      "Une femme voyage à travers le désordre des souvenirs : l'enfance dans sa cage d'or à Saigon, l'arrivée du communisme dans le Sud-Vietnam apeuré, la fuite dans le ventre d'un bateau au large du golfe de Siam, l'internement dans un camp de réfugiés en Malaisie, les premiers frissons dans le froid du Québec. Récit entre la guerre et la paix, ru dit le vide et le trop-plein, l'égarement et la beauté. De ce tumulte, des incidents tragi-comiques, des objets ordinaires émergent comme autant de repères d'un parcours. En évoquant un bracelet en acrylique rempli de diamants, des bols bleus cerclés d'argent ou la puissance d'une odeur d'assouplissant, Kim Thúy restitue le Vietnam d'hier et d'aujourd'hui avec la maîtrise d'un grand écrivain.",
    categories: ['fiction'],
    language: 'French',
    imagePath: '/images/ru.jpg',
    price: 11.99,
    timeAdded: 1564676760589,
    seller: 'Christie Kotsopoulos',
  },
];

//Data Classes

class Item {
  constructor(
    id,
    title,
    author,
    desc,
    category,
    language,
    imagePath,
    price,
    seller
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.desc = desc;
    this.category = category;
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

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line

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
  const id = generateId();
  const title = req.body.title;
  const author = req.body.author;
  const language = req.body.language;
  const category = req.body.category;
  const price = req.body.price;
  const desc = req.body.desc;
  const seller = username;
  const imagePath = req.file ? `/images/${req.file.filename}` : '';
  const newItem = new Item(
    id,
    title,
    author,
    desc,
    category,
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
});

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
