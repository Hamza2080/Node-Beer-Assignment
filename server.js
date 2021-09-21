const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
require('dotenv').config()

// initiating database
require('./database/database.connection');

const beerRouter = require('./routes/beer.router');
const { errorHandler } = require('./middleware/error-handler.middleware');

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// adding cors setting for staging and development...
if (['staging', 'development'].includes(process.env.environment)) {
  app.use(cors())
}

// router file...
app.use('/api', beerRouter);
app.use(errorHandler);


app.listen(3003, () => {
  console.log(`Server is listening on port ${3003}`);
});
