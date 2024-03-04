const{Schema, model} = require("mongoose")
const userSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    status:{
        type: Boolean,
        required: true,
        default:true
    },
    description:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    discounted_price:{
        type:Schema.Types.Mixed,
    },
   price:{
    type: Number,
    required:true,
   },
   images:{
    type:[String],
    required:true,
   },
   category_id:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'catogories'
   },
   brand_id:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'brands'
   },
   featured:{
    type:Boolean,
    default:false
   }
}, {
    timestamps: true,
    autoIndex:true,
    autoCreate:true,

})

const Product = model('Product', userSchema)

module.exports =  Product
