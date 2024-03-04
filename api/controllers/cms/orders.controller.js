const { mongoose } = require('mongoose')
const { showError } = require('../../lib')
const { Order, OrderDetail } = require('../../models')

class OrdersController {
    index = async (req, res, next) => {
        try{
            let orders = await Order.aggregate([
                {$lookup:{from:'users', localField:'user_id', foreignField:'_id', as: 'user'}}
            ]).exec()

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
                        user:order.user[0],
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

    update = async (req,res,next) =>{
        try{
            const {status} = req.body
            
            await Order.findByIdAndUpdate(req.params.id, {status})

            res.json({
                message: 'Order Updated'
            })

        }catch(err){
            showError(err, next)
        }  
    }

    destroy = async (req, res, next) => {
        try{ 
            await OrderDetail.deleteMany({order_id: req.params.id})
            
            await Order.findByIdAndDelete(req.params.id)

            res.json({
                message: 'Order deleted'
            })

        }catch(err){
            showError(err, next)
        }  
    }

}

module.exports = new OrdersController