const express = require('express');
const router = express.Router();

const { beerPost, beerPatch, beerGet, beerGetByName } = require('./../handlers/beer.handler');

/**
 * @metho post
 * @route /api/beer
 * @description create new beer
 */
router.post('/beer', async (req, res) => {
  const { body } = req;
  try {
    res.status(200).send(await beerPost(body));
  } catch (error) {
    response = {
      message: error.message,
      status: error.statusCode
    }

    res.status(error.statusCode).send(error.message);
  }
});

/**
 * @metho patch
 * @route /api/beer/:beerId
 * @description add rating against existing beer
 */
router.patch('/beer/:beerId', async (req, res) => {
  const { body } = req;
  const { beerId } = req.params;

  try {
    res.status(200).send(await beerPatch(body, beerId));
  } catch (error) {
    response = {
      message: error.message,
      status: error.statusCode
    }

    res.status(error.statusCode).send(error.message);
  }
})


/**
 * @metho get
 * @route /api/beer
 * @description get all beer collections
 */
router.get('/beer', async (req, res) => {
  try {
    res.status(200).send(await beerGet());
  } catch (error) {
    response = {
      message: error.message,
      status: error.statusCode
    }

    res.status(error.statusCode).send(error.message);
  }
});

/**
 * @metho get
 * @route /api/beer/:name
 * @description get beer collection using text search
 */
router.get('/beer/:name', async (req, res) => {
  try {
    res.status(200).send(await beerGetByName(req.params.name));
  } catch (error) {
    response = {
      message: error.message,
      status: error.statusCode
    }

    res.status(error.statusCode).send(error.message);
  }
});

module.exports = router;
