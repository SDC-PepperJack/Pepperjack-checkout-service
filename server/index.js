require('newrelic');
const express = require('express');
const morgan = require('morgan');
const Postgres = require('./pgQuery.js');
const PORT = process.env.PORT || 1234;

const app = express();

app.use(morgan('combined'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/checkout/:productId/details', (req, res) => {
  const { productId } = req.params;

  Postgres.getProduct(productId, req, res)
});

app.post('/api/checkout/:productId/details', (req, res) => {
  const { productId } = req.params;
  const { sellerId, sellerName, averageReviewScore, numberReviews, itemName, itemPrice, freeShipping, personalization, availableQuantity, onOrder } = req.body;

  Postgres.insertProduct(productId, sellerId, sellerName, averageReviewScore, numberReviews, itemName, itemPrice, freeShipping, personalization, availableQuantity, onOrder, (err, result) => {
    if (err) {
      res.status(404);
      res.send("Error adding new product");
    } else {
      res.send('Successful addition of new product');
    }
  })
});

app.put('/api/checkout/:productId/details', (req, res) => {
  const { productId, freeShipping } = req.body;
  Postgres.updateProduct(productId, freeShipping, (err, results) => {
    if (err) {
      res.status(404);
    } else {
      res.send('Successful update');
    }
  })
});

app.delete('/api/checkout/:productId/details', (req, res) => {
  const { productId } = req.params;
  Postgres.deleteProduct(productId, (err, results) => {
    if (err) {
      res.status(404);
    } else {
      res.send('Delete successful');
    }
  })
});


app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
