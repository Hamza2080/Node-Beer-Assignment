const { object, string, enums, optional } = require('superstruct');

const beerStruct = object({
  name: string(),
  beerType: enums(['Pale ale', 'Stout']),
  rating: optional(string())
});


module.exports = { beerStruct };
