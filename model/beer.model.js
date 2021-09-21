const mongoose = require('mongoose'), Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const beerSchema = new Schema({
  name: { type: String, unique: true },
  beerType: String,
  rating: [String],
}, { versionKey: false });

module.exports.BeerModel = mongoose.model('Beer', beerSchema);
