const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const Product=require('../models/Product');


router.get('/get-prods', async(req, res) => {
  
  try {
    const { type, brand, color, priceOption , name_of_product, sortingOption  } = req.query;
    
    let query = {};

    const priceRange = {
      low: { $gte: 0, $lte: 1000 },
      medium: { $gte: 1000, $lte: 10000 },
      high: { $gte: 10000, $lte: 20000 }
};

    if (type) {
      query.type = new RegExp(type, 'i');
    }
    if (brand) {
      query.brand = new RegExp(brand, 'i');
    }
    if (color) {
      query.color = new RegExp(color, 'i');
    }
    if (priceOption in priceRange) query.price = priceRange[priceOption];
    
    if (name_of_product) {
      query.name_of_product = new RegExp(name_of_product, 'i');
    }
    
    const products = await Product.find(query);

    let sortedProducts;

    if (sortingOption) {
      switch (sortingOption) {
        case 'lowest':
          sortedProducts = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'highest':
          sortedProducts = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case 'ascending':
          sortedProducts = products.sort((a, b) => a.name_of_product.toLowerCase() > b.name_of_product.toLowerCase() ? 1 : -1);
          break;
        case 'descending':
          sortedProducts = products.sort((a, b) => a.name_of_product.toLowerCase() < b.name_of_product.toLowerCase() ? 1 : -1);
          break;
        default:
          sortedProducts = products;
          break;
      }
    } else {
      sortedProducts = products;
    }

    res.send({ status: 'success', products: sortedProducts });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});


router.get('/get-prod-desc/:id', async(req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product) {
      res.send({ status: 'success', product });
    } else {
      res.send({ status: 'failed', message: 'No product found with the provided ID' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});



module.exports = router;