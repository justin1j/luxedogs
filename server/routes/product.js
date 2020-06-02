const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product')
const multer = require('multer')
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png') {
          return cb(res.status(400).end('only jpg, png are allowed'), false);
      }
      cb(null, true)
  }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
  //after getting image from client
  // save it inside Node server
  upload(req, res, err => {
    if (err) return res.json({ success: false, err })
    return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
  })
});

router.post("/uploadProduct", auth, (req, res) => {
  //save all the data we got from the client into the db
  const product = new Product(req.body);
  product.save(err => {
    if (err) return res.status(400).json({ success: false, err});
    return res.status(200).json({ success: true })
  })
});

router.post("/getProducts", (req, res) => {
  const order = req.body.order ? req.body.order : 'desc';
  const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  const limit = req.body.limit ? req.body.limit : 100;
  const skip = parseInt(req.body.skip);
  const term = req.body.searchTerm;

  const findArgs = {};


  console.log('here1', req.body.filters)

  for (let key in req.body.filters) {
    // console.log(key)
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        console.log('hello',findArgs[key])
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } 
      if (key === 'size') {
        findArgs[key] = req.body.filters[key]
      }
    } 
  }

  console.log('here',findArgs)
  console.log('term', term)

  if (term) {
    Product.find(findArgs)
    .find({ title: { $regex: term, $options: 'i' }})
    .populate('author')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err})
      return res.status(200).json({ success: true, products, displaySize: products.length }), console.log(products)
    })
  } else {
    Product.find(findArgs)
    .populate('author')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err})
      return res.status(200).json({ success: true, products, displaySize: products.length }), console.log(products)
    })
  }


});

module.exports = router;