const { showError } = require("../../lib")
const bcrypt = require("bcryptjs")
const { User, Review, Order, OrderDetail } = require("../../models")
const { default: mongoose } = require("mongoose")

class ProfileController{
    details = async (req, res, next) =>{
        try{
            res.json(req.user)
        }catch(err){
            showError
        }
    }
    
    edit = async (req, res, next) =>{
        try{
            const {name, address, phone} = req.body
            
            await User.findByIdAndUpdate(req.uid, {name, address, phone})

            res.json({
                message: 'Profile Updated'
            })

        }catch(err){
            showError
        }
    }

    password = async (req, res, next) =>{
        try{
            const {old_password,  new_password, confirm_password} = req.body
            if (bcrypt.compareSync(old_password, req.user.password)){
                if(new_password == confirm_password){
                    const hash = bcrypt.hashSync(new_password,bcrypt.genSaltSync(10))
                    await User.findByIdAndUpdate(req.uid, {password: hash})
                    res.json({
                        message:'Password updated'
                    })
                    }else{
                        next({
                            message:"password not confirmed",
                            status: 422,
                        })
                    }        
                }else{
                    next({
                        message: 'Incorrect old password',
                        status: 404
                    })
                }
            }catch(err){
            showError(err, next)
            }
       
    }

    reviews = async (req, res, next) =>{
        try{
            let reviews = await Review.aggregate([
                {$match:{user_id: new mongoose.Types.ObjectId(req.uid)}},
                {$lookup:{from:'products', localField:'product_id', foreignField:'_id', as: 'product'}}
            ]).exec()

            reviews = reviews.map(review =>{
                return{
                    _id:review._id,
                    user_id:review.user_id,
                    product_id:review.product_id,
                    rating:review.rating,
                    comment:review.comment,
                    product:review.product[0],
                    createdAt:review.createdAt,
                    updatedAt:review.updatedAt,
                    __v:review.__v
                }
            })

            res.json(reviews)
        }catch(err){
            showError(err, next)
        }
    }

    orders = async (req, res, next) =>{
        try{
            let orders = await Order.find({user_id:req.uid}).exec()

            orders= await Promise.all(orders.map( async order =>{
                    let details = await OrderDetail.aggregate([
                        {$match:{order_id: new mongoose.Types.ObjectId(order._id)}},
                        {$lookup:{from:'products', localField:'product_id', foreignField:'_id', as: 'product'}}
                    ]).exec()

                    details = details.map(detail =>{
                        return{
                            _id:detail._id,
                            order_id:detail.order_id,
                            product_id:detail.product_id,
                            qty:detail.qty,
                            price:detail.price,
                            total:detail.total,
                            product:detail.product[0],
                            createdAt:detail.createdAt,
                            updatedAt:detail.updatedAt,
                            __v:detail.__v
                        }
                    })

                    return{
                        _id:order._id,
                        user_id:order.user_id,
                        status:order.status,
                        details:details,
                        createdAt:order.createdAt,
                        updatedAt:order.updatedAt,
                        __v:order.__v
                    }
                }))

                res.json(orders)
        }catch(err){
            showError(err, next)
        }
    }  
    rating = async (req, res, next) =>{
        try{
            const {comment, rating} = req.body
            await Review.create({comment, rating, user_id:req.uid, product_id:req.params.id})

            res.json({
                message:'Thank you for your review..'
            })
        }catch(err){
            showError(err, next)
            }
    }
    
    checkout = async (req, res, next) =>{
        try{
            const order = await Order.create({user_id:req.uid})

            for (let id in req.body){
                await OrderDetail.create({
                    order_id: order._id,
                    product_id: id,
                    price: req.body[id].price,
                    qty: req.body[id].qty,
                    total: req.body[id].total,
                })
            }

            res.json({
                message:"Thank you for your order. It is currently being processed"
            })
        }catch(err){
            showError(err, next)
            }
    }
}

module.exports =new ProfileController