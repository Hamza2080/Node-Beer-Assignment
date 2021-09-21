const { assert, object, integer } = require('superstruct');
const struct = require('../struct/beer.struct');
const NotFoundError = require('../error/notFound.error');
const UnexpectedError = require('../error/unexpected.error');
const ValidationError = require('../error/validation.error');
const { BeerModel } = require('./../model/beer.model');

/**
 * @method beerGet
 * @description get all beer from database
 * @returns collection of beer from database
 */
const beerGet = async () => {
  try {
    const data = await BeerModel.find({}, { _v: false });
    return data.map(item => ({
      id: item._id,
      name: item.name,
      type: item.beerType,
      averageRating: calculateRating(item.rating)
    }));
  } catch (error) {
    throw new UnexpectedError(500, error.message);
  }
};

/**
 * @method beerGetByName
 * @param beerName: string
 * @description get beer from database by beer name
 * @returns collection of all beers which have found against beerName (full name or partial name)
 */
const beerGetByName = async (beerName) => {
  let response;
  try {
    response = await BeerModel.find({ name: new RegExp(beerName, 'i')});
  } catch (error) {
    throw new UnexpectedError(500, error.message);
  }

  if (!response) {
    throw new NotFoundError(404, `No record found against ${beerName}`);
  }

  return response.map(item => ({
    id: item._id,
    name: item.name,
    type: item.beerType,
    averageRating: calculateRating(item.rating)
  }));
};

/**
 * @method beerPost
 * @param body: beerStruct
 * @description create new beer object in database (name must be unique)
 * @returns return newly created beer object
 */
const beerPost = async (body) => {
  try {
    assert(body, struct.beerStruct);
  } catch (error) {
    throw new ValidationError(400, `bad request, ${error.message}`);
  }

  try {
    return await BeerModel.create(body);
  } catch (error) {
    throw new UnexpectedError(500, error.message);
  }
}

/**
 * @method beerPatch
 * @param body: { rating: string}, beerId: string
 * @description add new rating for beer in rating array in db
 * @returns return success message
 */
const beerPatch = async (body, beerId) => {
  try {
    assert(body, object({ rating: integer() }));
    if (body.rating < 0 || body.rating > 5) {
      throw new Error('rating must greater then 0 and less then or equals to 5.');
    }
  } catch (error) {
    throw new ValidationError(400, `bad request, ${error.message}`);
  }

  const rating = body.rating;

  try {
    const beer = await BeerModel.findById(beerId);
    if (!beer) {
      throw new NotFoundError(404, `No record found against ${beerId}`);
    }

    beer.rating.push(rating.toString());
    await beer.save();
    return {
      success: true
    }
  } catch (error) {
    throw new UnexpectedError(500, error.message);
  }

}

/**
 * @method calculateRating
 * @param {*} ratingHistory
 * @returns average rating key after calculation
 */
const calculateRating = (ratingHistory) => {
  if (ratingHistory && Array.isArray(ratingHistory) && ratingHistory.length > 0) {
    return (ratingHistory.reduce((a, r) => (Number(a) + Number(r)))/ratingHistory.length).toPrecision(1);
  }
};


module.exports = { beerPost, beerPatch, beerGet, beerGetByName };
