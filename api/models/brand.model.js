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
    }
}, {
    timestamps: true,
    autoIndex:true,
    autoCreate:true,

})

const Brand = model('Brand', userSchema)

module.exports =  Brand