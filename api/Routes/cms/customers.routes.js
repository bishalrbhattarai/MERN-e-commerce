const  { Cms } = require("../../controllers")
const express = require("express")

const router = express.Router()
router.route('/')
    .get(Cms.Customers.index)
    .post(Cms.Customers.store)

router.route('/:id')
    .get(Cms.Customers.show)
    .put(Cms.Customers.update)
    .patch(Cms.Customers.update)
    .delete(Cms.Customers.destroy)

module.exports = router