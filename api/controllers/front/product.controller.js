const { Product, Review } = require("../../models")
const { showError } = require("../../lib")
const { default: mongoose } = require("mongoose")

class ProductController{
    latest = async (req, res, next) =>{
        try{
            const products = await Product.find({status: true}).sort({'createdAt' : 'desc'}).exec()

            res.json(products)
        }catch(err){
            showError(err, next)
        }
    }

    featured = async (req, res, next) =>{
        try{
            const products = await Product.find({status: true, featured:true}).sort({
                'createdAt' : 'desc'
            }).exec()

            res.json(products)
        }catch(err){
            showError(err, next)
        }
    }

    top = async (req, res, next) =>{
        try{
            const products = await Product.aggregate([
                {$match:{status:true}},
                {$lookup:{from:'orderdetails', localField:'_id', foreignField:'product_id', as : 'order_count'}},
                {$addFields:{order_count:{$size:'$order_count'}}}
            ]).sort({order_count:'desc', createdAt:'desc'}).exec()

            res.json(products)

        }catch(err){
            showError(err, next)
        }
    }

    similar = async (req, res, next) =>{
        try{
            const product = await Product.findById(req.params.id)
            const products = await Product.find({status: true, category_id:product.category_id, _id:{$ne: product._id}}).exec()

            res.json(products)
        }catch(err){
            showError(err, next)
        }
    }

    byCategory = async (req, res, next) =>{
        try{
            const products = await Product.find({status: true, category_id: req.params.id}).exec()

            res.json(products)
        }catch(err){
            showError(err, next)
        }
    }

    byBrand = async (req, res, next) =>{
        try{
            const products = await Product.find({status: true, brand_id: req.params.id}).exec()

            res.json(products)
        }catch(err){
            showError(err, next)
        }
    }

    search = async (req, res, next) =>{
        try{
            const products = await Product.find({status: true, name:{$regex:`${req.query.term}`, $options: 'i'}}).exec()

            res.json(products)
        }catch(err){
            showError(err, next)
        }
    }

    byId = async (req, res, next) =>{
        try{
            const products = await Product.aggregate([
                {$match: {status:true, _id:new mongoose.Types.ObjectId(req.params.id)}},
                {$lookup: {from: 'catogories', localField:'category_id', foreignField:'_id', as :'category'}},
                {$lookup: {from: 'brands', localField:'brand_id', foreignField:'_id', as :'brand'}}
           ]).exec()

           const reviews = await Review.aggregate([
            {$match: {product_id:new mongoose.Types.ObjectId(req.params.id)}},
            {$lookup: {from: 'users', localField:'user_id', foreignField:'_id', as :'user'}}

           ]).exec()


           const product = {
            _id : products[0]._id,
            name : products[0].name,
            summary : products[0].summary,
            description : products[0].description,
            price : products[0].price,
            discounted_price : products[0].discounted_price,
            category_id : products[0].category_id,
            brand_id : products[0].brand_id,
            images : products[0].images,
            status : products[0].status,
            featured : products[0].featured,
            category: products[0].category[0],
            brand : products[0].brand[0],
            reviews : reviews.map(review =>{
                return{
                    _id : review.id,
                    user_id : review.user_id,
                    product_id : review.product_id,
                    rating: review.rating,
                    comment: review.comment,
                    createdAt:review.createdAt,
                    updatedAt: review.updatedAt,
                    user: review.user[0],
                    __v:review.$lookup__v

                }
            }
          
            ),
            createdAt:products[0].createdAt,
            updatedAt: products[0].updatedAt,
            __v:products[0].__v,
        }

            res.json(product)
        }catch(err){
            showError(err, next)
        }
    }


}

module.exports = new ProductController