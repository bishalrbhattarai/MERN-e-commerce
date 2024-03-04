const express = require('express')
const productRoutes = require('./product.routes')
const listRoutes = require('./list.routes')


const router = express.Router()


router.use('/product', productRoutes)

router.use(listRoutes)





module.exports = router