const{Schema, model} = require("mongoose")
const userSchema = new Schema({
   user_id:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'users'
   },
   status:{
    type:String,
    enum:['Processing', 'Confirmed','Shipping', 'Delivered', 'Cancelled'],
    default: 'Processing'
   }
}, {
    timestamps: true,
    autoIndex:true,
    autoCreate:true,

})

const Order = model('Order', userSchema)

module.exports =  Order
