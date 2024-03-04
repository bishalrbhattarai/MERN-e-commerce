const  { Cms } = require("../../controllers")
const express = require("express")

const router = express.Router()

router.get('/',Cms.Orders.index)

router.route('/:id')
    .put(Cms.Orders.update)
    .patch(Cms.Orders.update)
    .delete(Cms.Orders.destroy)



module.exports = router