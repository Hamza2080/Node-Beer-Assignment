require('./database.connection');
const { BeerModel } = require('../model/beer.model');

const beerData = [
  {
    "name": "beerSP1",
    "type": "Pale ale",
    "rating": ["4", "1"]
  },
  {
    "name": "beerSP2",
    "type": "Pale ale",
    "rating": ["4", "4", "2"]
  },
  {
    "name": "beerSP3",
    "type": "Pale ale",
    "rating": ["5","4"]
  },
  {
    "name": "beerSP4",
    "type": "Pale out",
    "rating": ["3"]
  }
];

(async () => {
  try {
    BeerModel.insertMany(beerData, (err, doc) => {
      console.log('done seeding');
      process.exit();
    });
  } catch (error) {
    console.log(error)
  }
})();
