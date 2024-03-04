const  { Cms } = require("../../controllers")
const express = require("express")
const { fileUpload } = require('../../lib')


const router = express.Router()

const mimes = [ 'image/jpeg', 'image/png', 'image/gif']
router.route('/')
    .get(Cms.Products.index)
    .post(fileUpload(mimes).array('images'), Cms.Products.store)

router.route('/:id')
    .get(Cms.Products.show)
    .put(fileUpload(mimes).array('images'),Cms.Products.update)
    .patch(fileUpload(mimes).array('images'),Cms.Products.update)
    .delete(Cms.Products.destroy)

router.delete('/:id/image/:filename', Cms.Products.image)
module.exports = router