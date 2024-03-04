const  { Cms } = require("../../controllers")
const express = require("express")

const router = express.Router()

router.get('/',Cms.Reviews.index)

router.delete('/:id',Cms.Reviews.destroy)



module.exports = router