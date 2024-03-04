const{Schema, model} = require("mongoose")
const userSchema = new Schema({
    comment:{
        type: String,
        required:true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

   user_id:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'users'
   },
   product_id:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'products'
   }
}, {
    timestamps: true,
    autoIndex:true,
    autoCreate:true,

})

const Review = model('Review', userSchema)

module.exports =  Review
