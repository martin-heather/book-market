const inventory = [
  {
    id: 1,
    title: 'Sapiens: A Brief History of Humankind',
    author: { lastName: 'Harari', givenNames: 'Yuval Noah' },
    desc:
      '100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations and human rights; to trust money, books and laws; and to be enslaved by bureaucracy, timetables and consumerism? And what will our world be like in the millennia to come? ',
    category: [
      'nonfiction',
      'history',
      'science',
      'philosophy',
      'anthropology',
    ],
    imagePath: '#',
    price: 23.99,
    timeAdded: 1564529906987,
  },
  {
    id: 2,
    title: "L'ironie de l'évolution",
    author: { lastName: 'Durand', givenNames: 'Thomas C.' },
    desc:
      "La théorie de l'évolution met en jeu un stimulant paradoxe : c'est justement l'évolution (de notre cerveau) qui explique les résistances à cette idée. Ainsi, les difficultés que nous éprouvons à \"croire\" la théorie darwinienne de l'évolution s'expliquent elles-mêmes par ladite théorie, et en constituent finalement une éclatante illustration.",
    category: ['science'],
    imagePath: '#',
    price: 17.99,
    timeAdded: 1564529938516,
  },
  {
    id: 3,
    title: 'Dreadnought ',
    author: { lastName: 'Daniels', givenNames: 'April' },
    desc:
      'Danny Tozer has a problem: she just inherited the powers of Dreadnought, the world’s greatest superhero.  Until Dreadnought fell out of the sky and died right in front of her, Danny was trying to keep people from finding out she’s transgender. But before he expired, Dreadnought passed his mantle to her, and those secondhand superpowers transformed Danny’s body into what she’s always thought it should be. Now there’s no hiding that she’s a girl. It should be the happiest time of her life, but Danny’s first weeks finally living in a body that fits her are more difficult and complicated than she could have imagined. Between her father’s dangerous obsession with “curing” her girlhood, her best friend suddenly acting like he’s entitled to date her, and her fellow superheroes arguing over her place in their ranks, Danny feels like she’s in over her head.  She doesn’t have much time to adjust. Dreadnought’s murderer—a cyborg named Utopia—still haunts the streets of New Port City, threatening destruction. If Danny can’t sort through the confusion of coming out, master her powers, and stop Utopia in time, humanity faces extinction.',
    category: ['young adult', 'LGBTQ', 'superheroes', 'fantasy'],
    imagePath: '#',
    price: 10.99,
    timeAdded: 1564529965305,
  },
];

const userProfiles = [
  {
    name: 'Heather Martin',
    password: '',
    titlesInWishlist: [2],
    titlesForSale: [1, 3],
  },
  {
    name: 'Hsiu-Jin Chan',
    password: '67891',
    titlesInWishlist: [1],
    titlesForSale: [3],
  },
  {
    name: 'Samer Ahmed',
    password: '11121',
    titlesInWishlist: [3, 1],
    titlesForSale: [2],
  },
  {
    name: 'Christie Kotsopoulos',
    password: '31415',
    titlesInWishlist: [3, 1],
    titlesForSale: [2],
  },
  {
    name: 'Daniel Reneau',
    password: '16171',
    titlesInWishlist: [3, 1],
    titlesForSale: [2],
  },
];
