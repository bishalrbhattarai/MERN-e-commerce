const { adminOnly } = require('../../lib')
const staffsRoutes = require('./staffs.routes')
const brandsRoutes = require('./brands.routes')
const categoriesRoutes = require('./categories.routes')
const reviewsRoutes = require('./reviews.routes')
const productsRoutes = require('./products.routes')
const customersRoutes = require('./customers.routes')
const ordersRoutes = require('./orders.routes')



const express = require("express")

const router = express.Router()

router.use('/staffs', adminOnly, staffsRoutes)
router.use('/brands', brandsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/reviews', reviewsRoutes)
router.use('/products', productsRoutes)
router.use('/customers', customersRoutes)
router.use('/orders', ordersRoutes)


module.exports = router