const express = require('express')
const {Front} = require('../../controllers')


const router = express.Router()

router.get('/search', Front.Product.search)

router.get('/brand/:id/products', Front.Product.byBrand)

router.get('/category/:id/products', Front.Product.byCategory)

router.get('/brand/all', Front.List.brands)

router.get('/brand/:id', Front.List.brandById)

router.get('/category/all', Front.List.categories)

router.get('/category/:id', Front.List.categoryById)

module.exports = router