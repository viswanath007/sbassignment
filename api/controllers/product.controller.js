import Product from '../models/product';
import sanitizeHtml from 'sanitize-html';
// const MongoClient = require('mongodb').MongoClient;
import serverConfig from '../../config';


function sanitize(text){
  return sanitizeHtml(text);
}

/**
 * Save a product
 * @param req
 * @param res
 * @returns void
 */
export function addProduct(req, res) {
  // console.log(req.body);
  const { productName, quantity, userName } = req.body;
  if (!productName || !quantity || !userName) {
    res.status(403).send({ error: "productName, quantity and userName are not provided"});
    return;
  } 

  // Let's sanitize inputs
  const product = {
    productName: sanitize(productName),
    quantity: sanitize(quantity)
  }

  const update = {
    $push: {
      products: product
    }
  };

  const options = {
    new: true,
    upsert: true
  };

  Product.findOneAndUpdate({userName}, update, options, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log(product);
      const { products } = doc || {};
      // res.json({ product: products[products.length-1]});
      res.json({ products });
    }
  });

  // (async function () {
  //   // Database Name
  //   const client = new MongoClient(serverConfig.mongoURL, { useNewUrlParser: true });

  //   try {
  //     // Use connect method to connect to the Server
  //     await client.connect();

  //     const db = client.db('mydb');

  //     await db.collection('products')
  //       .findOneAndUpdate({ userName }, update, options, (err, product) => {
  //       if (err) {
  //         res.status(500).send(err);
  //       } else {
  //         // console.log(product);
  //         res.json(product.value);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err.stack);
  //   }

  //   client.close();
  // })();
}

/**
 * get User products
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  const { userName } = req.body;
  if (!userName) {
    res.status(403).send({ error: "username is not provided" });
    return;
  } 
  Product.findOne({ userName })
    .exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
      const { products } = doc || {};
      res.json({ products });
  });
}
